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
    username:{
        type: String,
        require: [true, 'Post needs and associated user']
    },   
    meta:{
        userId:{
            type: mongoose.SchemaTypes.ObjectId
        },
        comments: {
            type: [Comment.schema]
        },
        votes: {
            type: Map,
            of: Number
        }
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Post", postSchema)