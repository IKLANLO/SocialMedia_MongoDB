const SocialMedia = require('../models/SocialMedia')
const Post = require('../models/Posts')
const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../config/keys')

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const payload = jwt.verify(token, jwt_secret)
    const user = SocialMedia.findOne({_id: payload._id, tokens: token})
    if (!user) return res.status(401).send({message: 'not authorized'})
    req.user = user
    next()
  } catch (error) {
    console.log(error)
    return res.status(500).send({message: 'an error occurred with the token'})
  }
}

const isAuthor = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id)
    if (!post._id) return res.status(403).send({message: 'the post id does not exists'})
    if (post.userId.toString() !== req.user._conditions._id.toString()) {
      return res.status(403).send({message: 'this is not your post'})
    }
    next()
  } catch (error) {
    console.log(error)
    return res.status(500).send({message: 'error verifying the authorship of the post'})
  }
}

module.exports = { authentication, isAuthor }