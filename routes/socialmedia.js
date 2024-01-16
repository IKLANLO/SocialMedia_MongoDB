const express = require('express')
const router = express.Router()
const SocialMediaController = require('../controllers/SocialMediaController')
const { authentication } = require('../middlewares/authentication')

router.post('/', SocialMediaController.createUser)
router.get('/', SocialMediaController.getAll)
router.post('/login', authentication, SocialMediaController.login)
router.delete('/logout', authentication, SocialMediaController.logout)

module.exports = router