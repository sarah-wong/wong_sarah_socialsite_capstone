const express = require('express')
const postsController = require('../controllers/postsController')
const ensureLoggedIn = require('../config/ensureLoggedIn')

const router = express.Router()

router.get('/', postsController.fetchPosts)
router.get('/:id', postsController.fetchPost)
router.use(ensureLoggedIn)
// posting, editing, and deleting require a logged-in user
router.post('/', postsController.createPost)
router.put('/:id', postsController.updatePost)
router.delete('/:id', postsController.deletePost)