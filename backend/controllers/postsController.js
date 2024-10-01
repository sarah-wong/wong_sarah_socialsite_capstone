const Post = require('../models/post')

// CREATE
async function createPost(req, res){
    const userId = req.user._id
    const {title, content, tags} = req.body
    const post = await Post.create({
        title:title,
        content:content,
        userId:userId,
        likes:0,
        dislikes:0,
        tags:tags,
        comments:[]
    })
    res.json({post:post})
}
// READ
async function fetchPost(req, res){
    const id = req.params.id
    const post = await Post.findById(id)
    res.json({post:post})
}
async function fetchAllPosts(req, res){
    const posts = await Post.find()
    res.json({posts:posts})
}
// UPDATE


async function updatePost(req, res){
    const id = req.params.id
    const {title, content, tags} = req.body
    const post = Post.findById(id);

    // Cannot edit other user's posts
    if(req.user && post.userId === req.user._id){
        Post.findByIdAndUpdate(id, {
            ...post,
            title: title,
            content: content,
            tags: tags
        })
    }
    else if (req.user){
        res.status(403).json('Forbidden')
    }
    else{
        res.status(401).json('Unauthorized');
    }
}
// DELETE

async function deletePost(req, res){
    const id = req.params.id
    const {title, content, tags} = req.body
    const post = Post.findById(id);

    // Cannot delete other user's posts unless you're an admin
    if(req.user && (post.userId === req.user._id || req.user.access == 'ADMIN')){
        Post.findByIdAndUpdate(id, {
            ...post,
            title: title,
            content: content,
            tags: tags
        })
    }
    else if (req.user){
        res.status(403).json('Forbidden')
    }
    else{
        res.status(401).json('Unauthorized');
    }
}

module.exports = {createPost, fetchPost, fetchAllPosts, updatePost, deletePost}