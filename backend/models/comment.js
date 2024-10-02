const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    text:{
        type: String,
        required: [true, 'Comment cannot be blank']
    },
    commenterId:{
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, 'Comment needs an associated User'],
        alias: 'user'
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Comment", commentSchema)