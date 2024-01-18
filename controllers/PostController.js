const Posts = require('../models/Posts')

const PostController = {
  async createPost(req, res){
    try {
      if (!req.body.post) return res.status(401).send({message: 'please write some text'})
      const post = await Posts.create({
        ...req.body,
        userId: req.user._conditions._id
      })
      res.status(201).send({message: 'post created sucessfully', post})
    } catch (error) {
      console.log(error)
      res.status(500).send({message: 'error trying to create the post'})
    }
  },

  async updatePost(req, res){
    try {
      if (!req.body.post) return res.status(401).send({message: 'please write some text'})
      const post = await Posts.findByIdAndUpdate(
        req.params._id,
        { ...req.body, userId: req.user._conditions._id },
        {
          new: true
        }
      )
      res.status(201).send({message: 'post updated successfully', post})
    } catch (error) {
      console.log(error)
      res.status(500).send({message: 'error trying to update the post'})
    }
  },

  async deletePost(req, res){
    try {
      await Posts.findByIdAndDelete(req.params._id)
      res.status(200).send({message: 'post deleted successfully'})
    } catch (error) {
      console.log(error)
      res.status(500).send({message: 'error trying to delete the post'})
    }
  }
}

module.exports = PostController