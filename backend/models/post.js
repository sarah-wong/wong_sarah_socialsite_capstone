const mongoose = require('mongoose');
const Comment = require('./comment')

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
        type: [Comment.schema]
    },
    meta:{
        posterId:{
            type: mongoose.SchemaTypes.ObjectId,
            require: [true, 'Post needs an associated User']
        },
        votes: {
            type: mongoose.SchemaTypes.Map,
        }
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Post", postSchema)