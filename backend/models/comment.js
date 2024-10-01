const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text:{
        type: String,
        required: [true, 'Comment cannot be blank']
    },
    userId:{
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, 'Comment needs an associated User']
    },
    meta:{
        likes: Number,
        dislikes: Number,
        postUnder: {
            type: mongoose.SchemaTypes.ObjectId,
            required: [true, 'Comment must be attached to a Post']
        }
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Comment", commentSchema)