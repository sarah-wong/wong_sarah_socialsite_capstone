const mongoose = require('mongoose');

const usernameRe = /^\w+$/
const emailRe = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        unique: [true, 'Username is already taken'],
        match: [usernameRe, 'Username must consist of letters, numbers, and underscores'],
        minLength: [4, 'Username must be at least 4 characters']
    },
    email: {
        type: String,
        required: [true, 'Email address is required'],
        trim: true,
        lowercase: true,
        unique: [true, 'An account with that email already exists'],
        match: [emailRe, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true
    },
    access:{
        type: String,
        enum: ['USER','ADMIN'],
        default: 'USER'
    }
},{
    timestamps:true
})

module.exports = mongoose.model("User", userSchema)