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
        comments: {
            type: [Comment.schema]
        },
        votes: {
            type: mongoose.SchemaTypes.Map,
        }
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Post", postSchema)