const express = require('express')
const usersController = require('../controllers/usersController')

const router = express.Router()

router.post('/', usersController.createUser)
router.post('/login', usersController.login)

module.exports = router