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
    userId:{
        type: mongoose.SchemaTypes.ObjectId,
        require: [true, 'Post needs an associated User']
    },
    meta:{
        likes: Number,
        dislikes: Number,
        tags: [String],
        comments: [mongoose.SchemaTypes.ObjectId]
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Post", postSchema)