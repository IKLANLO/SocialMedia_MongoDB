const express = require('express')
const router = express.Router()
const SocialMediaController = require('../controllers/SocialMediaController')

router.post('/', SocialMediaController.createUser)
router.get('/', SocialMediaController.getAll)

module.exports = router