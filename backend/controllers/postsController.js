const Post = require('../models/post')
const Comment = require('../models/comment')


// CREATE
async function createPost(req, res){
    const username = req.user.name
    const {title, content, tags} = req.body
    const post = await Post.create({
        title:title,
        content:content,
        tags:tags,
        username:username,
        meta:{
            userId:req.user._id,
            comments:[],
            votes: new Map()
        }
    })
    // HTTP 201 Created
    res.status(201).json({post:post})
}

async function commentOnPost(req, res){
    const postId = req.params.id
    const username = req.user.name
    const {text} = req.body

    const post = await Post.findById(postId)

    const comment = await Comment.create({
        text:text,
        username:username
    })

    await Post.findByIdAndUpdate(postId, {
        comments: [...post.comments, comment]
    })

    // HTTP 201 Created
    res.status(201).json({comment:comment})
}

// READ
async function fetchPost(req, res){
    const id = req.params.id
    const post = await Post.findById(id)
    // HTTP 200 Success
    res.status(200).json({post:post})
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
    // HTTP 200 Success
    res.status(200).json({posts:posts})
}

// UPDATE

async function editPost(req, res){
    const id = req.params.id
    const {title, content, username, tags} = req.body
    const post = Post.findById(id);

    // Cannot edit other User's Posts
    if(post.meta.userId === req.user._id){
        await Post.findByIdAndUpdate(id, {
            title: title,
            content: content,
            username: username,
            tags: tags
        })
        const post = await Post.findById(id)
        // HTTP 200 Success
        res.status(200).json({post:post})
    }
    else{
        // HTTP 403 Forbidden
        res.status(403).json('Access Denied')
    }
}

async function voteOnPost(req, res){
    const postId = req.params.id
    const userId = req.user._id
    const {vote} = req.body

    const newVotes = await Post.findById(postId).votes
    newVotes.set(userId, vote)
    
    await Post.findByIdAndUpdate(postId, {
        votes: newVotes
    })

    const post = await Post.findById(postId)
    // HTTP 200 Success
    res.status(200).json({post:post})
}

// DELETE

async function deletePost(req, res){
    const id = req.params.id
    const post = Post.findById(id);

    // Cannot delete other User's Posts UNLESS you're an ADMIN
    if(post.meta.userId === req.user._id || req.user.access == 'ADMIN'){
        await Post.findByIdAndDelete(id)
        // HTTP 200 Success
        res.status(200).json({result:'Post successfully delete'})
    }
    else if (req.user){
        res.status(403).json('Forbidden')
    }
    else{
        res.status(401).json('Unauthorized')
    }
}

module.exports = {
    createPost,
    commentOnPost, 
    fetchPost, 
    fetchPosts, 
    editPost,
    voteOnPost,
    deletePost
}