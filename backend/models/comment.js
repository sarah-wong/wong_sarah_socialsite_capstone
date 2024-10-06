const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    text:{
        type: String,
        required: [true, 'Comment cannot be blank']
    },
    username:{
        type: String,
        required: [true, 'Comment needs an associated User']
    },
    meta:{
        userId: {
            type: mongoose.SchemaTypes.ObjectId
        }
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Comment", commentSchema)