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
    likes:{
        type:Number,
        min:0
    },
    dislikes:{
        type:Number,
        min:0
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Comment", commentSchema)