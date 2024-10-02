const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text:{
        type: String,
        required: [true, 'Comment cannot be blank']
    },
    meta:{
        commenterId:{
            type: mongoose.SchemaTypes.ObjectId,
            required: [true, 'Comment needs an associated User']
        },
        usersLiked:{
            type: [mongoose.SchemaTypes.ObjectId]
        },
        usersDisliked:{
            type: [mongoose.SchemaTypes.ObjectId]
        }
    }
},{
    timestamps:true
})

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
        type: [commentSchema]
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