const express = require('express')
const profilesController = require('../controllers/profilesController')
const ensureLoggedIn = require('../config/ensureLoggedIn')

const router = express.Router()

// viewing does not require login
router.get('/:username', profilesController.fetchProfile)
router.put('/:username/follow', profilesController.updateFollowers)

// updating requires login
router.use(ensureLoggedIn)
router.put('/', profilesController.editProfile)

module.exports = router