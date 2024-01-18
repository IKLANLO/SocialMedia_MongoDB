const express = require('express')
const router = express.Router()
const SocialMediaController = require('../controllers/SocialMediaController')
const { authentication } = require('../middlewares/authentication')
const { fieldsCheck } = require('../middlewares/fieldscheck')

router.post('/', fieldsCheck, SocialMediaController.createUser)
router.get('/', SocialMediaController.getAll)
router.post('/login', SocialMediaController.login)
router.delete('/logout', authentication, SocialMediaController.logout)

module.exports = router