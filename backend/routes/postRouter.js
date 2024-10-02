const express = require('express')
const postsController = require('../controllers/postsController')
const ensureLoggedIn = require('../config/ensureLoggedIn')

const router = express.Router()

// seeing posts does not require login
router.get('/', postsController.fetchPosts)
router.get('/:id', postsController.fetchPost)

// creating, editing, commenting, voting, and deleting requires login
router.use(ensureLoggedIn)
router.post('/', postsController.createPost)
router.post('/:id/comment', postsController.commentOnPost)
router.put('/:id', postsController.editPost)
router.put('/:id/vote', postsController.voteOnPost)
router.delete('/:id', postsController.deletePost)

