const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        require: [true, 'Post needs a title']
    },
    content:{
        type: String,
        require: [true, 'Post needs content']
    },
    tags: {
        type: [String]
    },
    comments: {
        type: [mongoose.SchemaTypes.ObjectId]
    },
    meta:{
        posterId:{
            type: mongoose.SchemaTypes.ObjectId,
            require: [true, 'Post needs an associated User'],
            alias: 'userId'
        },
        usersLiked: {
            type: [mongoose.SchemaTypes.ObjectId],
            alias: 'likes'
        },
        usersDisliked: {
            type: [mongoose.SchemaTypes.ObjectId],
            alias: 'dislikes'
        }
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Post", postSchema)