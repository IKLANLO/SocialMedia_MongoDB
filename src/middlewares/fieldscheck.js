const Post = require('../models/Posts')

const fieldsCheck = async (req, res, next) => {
  const fields = req.body
  if (!fields.first_name || !fields.last_name || !fields.email || !fields.password) {
    return res.status(401).send({message: 'All fields are required'})
  }
  next()
}

const postFieldsCheck = async (req, res, next) => {
  const fields = req.body
  if (!fields.name || !fields.post) return res.status(401).send({message: 'all fields are required'})
  next()
}

const likeCheck = async (req, res, next) => {
  const post = await Post.findById(req.params._id) 
  const check = post.likes.find((like) =>  like.userId?.equals(req.user._conditions._id))
  if (check) return res.status(401).send({message: 'this user has already liked the post'})
  next()
}

module.exports = { fieldsCheck, postFieldsCheck, likeCheck }