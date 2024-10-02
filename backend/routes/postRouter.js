const express = require('express')
const postsController = require('../controllers/postsController')
const ensureLoggedIn = require('../config/ensureLoggedIn')

const router = express.Router()

// seeing posts does not require login
router.get('/', postsController.fetchPosts)
router.get('/:id', postsController.fetchPost)

// creating, updating and deleting posts requires login
router.use(ensureLoggedIn)
router.post('/', postsController.createPost)
router.put('/:id', postsController.updatePost)
router.delete('/:id', postsController.deletePost)