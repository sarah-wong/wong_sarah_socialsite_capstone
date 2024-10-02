const Post = require('../models/post')


// CREATE
async function createPost(req, res){
    const userId = req.user._id
    const {title, content, tags} = req.body
    const post = await Post.create({
        title:title,
        content:content,
        tags:tags,
        comments:[],
        meta:{
            userId:userId,
            likes:[],
            dislikes:[]
        }
    })
    res.json({post:post})
}
// READ
async function fetchPost(req, res){
    const id = req.params.id
    const post = await Post.findById(id)
    res.json({post:post})
}

async function fetchPosts(req, res){

    const filter = {}
    // accepted filters are: title, user, tags
    if(req.query.title){
        filter.title = req.query.title
    }
    if(req.query.user){
        filter.meta.userId = req.query.user
    }
    if(req.query.tags){
        const tagList = req.query.tags.split(',')
        filter.tags = tagList
    }

    const posts = await Post.find(filter)
    res.json({posts:posts})
}

// UPDATE

async function updatePost(req, res){
    const id = req.params.id
    const {title, content, tags} = req.body
    const post = Post.findById(id);

    // Cannot edit other User's Posts
    if(post.userId === req.user._id){
        Post.findByIdAndUpdate(id, {
            title: title,
            content: content,
            tags: tags
        })
    }
    else{
        // HTTP 403 Forbidden
        res.status(403).json('Access Denied')
    }
}

// DELETE

async function deletePost(req, res){

    const id = req.params.id
    const {title, content, tags} = req.body
    const post = Post.findById(id);

    // Cannot delete other User's Posts UNLESS you're an ADMIN
    if(post.userId === req.user._id || req.user.access == 'ADMIN'){
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
        res.status(401).json('Unauthorized')
    }
}

module.exports = {createPost, fetchPost, fetchPosts, updatePost, deletePost}