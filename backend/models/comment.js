const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    text:{
        type: String,
        required: [true, 'Comment cannot be blank']
    },
    username:{
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, 'Comment needs an associated User']
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Comment", commentSchema)