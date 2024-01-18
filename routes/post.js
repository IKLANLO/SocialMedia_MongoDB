const express = require('express')
const router = express.Router()
const PostController = require('../controllers/postController')
const { authentication, isAuthor } = require('../middlewares/authentication')

router.post('/', authentication, PostController.createPost)
router.put('/update/:_id', authentication, isAuthor, PostController.updatePost)
router.delete('/delete/:_id', authentication, isAuthor, PostController.deletePost)

module.exports = router