const express = require('express')
const profilesController = require('../controllers/profilesController')
const ensureLoggedIn = require('../config/ensureLoggedIn')

const router = express.Router()

// viewing does not require login
router.get('/:username', profilesController.fetchProfile)

// updating requires login
router.use(ensureLoggedIn)
router.put('/', profilesController.updateProfile)