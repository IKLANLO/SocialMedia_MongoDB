const express = require('express')
const router = express.Router()
const PostController = require('../controllers/postController')
const { authentication, isAuthor } = require('../middlewares/authentication')
const { postFieldsCheck, likeCheck } = require('../middlewares/fieldscheck')

router.post('/', authentication, postFieldsCheck, PostController.createPost)
router.put('/update/:_id', authentication, isAuthor, PostController.updatePost)
router.delete('/delete/:_id', authentication, isAuthor, PostController.deletePost)
router.get('/id/:_id', PostController.getPostById)
router.get('/name/:name', PostController.getPostByName)
router.put('/comments/:_id', authentication, PostController.insertComment)
router.put('/likes/:_id', authentication, likeCheck, PostController.addLike)
router.put('/likes/delete/:_id', authentication, PostController.deleteLike)

module.exports = router