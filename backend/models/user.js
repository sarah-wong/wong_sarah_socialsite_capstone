const mongoose = require('mongoose');

const usernameRe = /^\w+$/
const emailRe = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new mongoose.Schema({
    credentials:{
        username: {
            type: String,
            required: [true, 'Username is required'],
            trim: true,
            unique: [true, 'Username is already taken'],
            match: usernameRe,
            minLength: 4,
            maxLength: 30
        },
        email: {
            type: String,
            required: [true, 'Email address is required'],
            trim: true,
            lowercase: true,
            unique: [true, 'An account with that email already exists'],
            match: emailRe
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            trim: true
        }
    },
    data:{
        posts: [mongoose.SchemaTypes.ObjectId],
        comments: [mongoose.SchemaTypes.ObjectId],
        likedPosts: [mongoose.SchemaTypes.ObjectId],
        dislikedPosts: [mongoose.SchemaTypes.ObjectId]
    }
},{
    timestamps:true
})

module.exports = mongoose.model("User", userSchema)