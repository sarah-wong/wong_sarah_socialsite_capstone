const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, 'Profile requires a username'],
        trim:true,
        unique:true
    },
    displayName:{
        type:String,
        trim:true,
        alias:'name'
    },
    status: String,
    bio: String,
    
    meta:{
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            required:true,
            unique:true
        },
        followerProfiles: {
            type: [mongoose.SchemaTypes.ObjectId],
            alias: 'followers'
        },
        followingProfiles: {
            type: [mongoose.SchemaTypes.ObjectId],
            alias: 'following'
        }
    }
})

module.exports = mongoose.model("Profile", profileSchema)