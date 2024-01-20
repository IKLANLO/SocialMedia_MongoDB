const Posts = require('../models/Posts')
const SocialMedia = require('../models/SocialMedia')

const PostController = {
  async createPost(req, res){
    try {
      if (!req.body.post) return res.status(401).send({message: 'please write some text'})
      const post = await Posts.create({
        ...req.body,
        userId: req.user._conditions._id
      })
      await SocialMedia.findByIdAndUpdate(req.user._conditions._id, { $push: { postIds: post._id } })
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
  },

  async getPostById(req, res){
    try {
      const posts = await Posts.findById(req.params._id)
      if (!posts) return res.status(400).send({message: 'No posts with the id'})
      res.status(200).send(posts)
    } catch (error) {
      console.log(error)
      res.status(500).send({message: 'error trying to find posts'})
    }
  },

  async getPostByName(req, res){
    try {
      const posts = await Posts.find({ name: req.params.name })
      if (!posts) return res.status(400).send({message: 'No posts with that name'})
      res.status(200).send(posts)
    } catch (error) {
      console.log(error)
      res.status(500).send({message: 'error trying to find posts'})
    }
  },

  async insertComment(req, res){
    try {
      const post = await Posts.findByIdAndUpdate(
        req.params._id,
        { $push: { comments: { comment: req.body.comment, userId: req.user._id }}},
        { new: true }
      )
      res.status(201).send({message: 'comment successfully added', post})
    } catch (error) {
      console.log(error)
      res.status(500).send({message: 'error trying to add the comment'})
    }
  },

  async addLike(req, res){
    try {
      const post = await Posts.findByIdAndUpdate(
        req.params._id,
        { $push: { likes: {userId: req.user._conditions._id } } },
        { new: true }
      )
      res.status(201).send({message: 'like successfully added', post})
    } catch (error) {
      console.log(error)
      res.status(500).send({message: 'error trying to add the like'})
    }
  },

  async deleteLike(req, res){
    try {
      // elimina el like bien si pertenece al usuario que lo dio, si no no lo hace, pero si lo intenta otro user 
      // también da mensaje de que se eliminó. También da ese mensaje aunque ya no exista el like
      const post = await Posts.findByIdAndUpdate(
        req.params._id,
        { $pull: { likes: { userId: req.user._conditions._id } }},
        { new: true }
      )
      res.status(200).send({message: 'like successfully deleted', post})
    } catch (error) {
      console.log(error)
      res.status(500).send({message: 'error trying to delete the like'})
    }
  }
}

module.exports = PostController