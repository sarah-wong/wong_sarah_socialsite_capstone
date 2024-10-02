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

module.exports = mongoose.model("Comment", commentSchema)