const SocialMedia = require('../models/SocialMedia')

const SocialMediaController = {
  async createUser(req, res){
    try {
      await SocialMedia.create(req.body)
      const data = {message: 'new user created successfully', ...req.body}
      res.status(201).send(data)
    } catch (error) {
      console.error(error)
      res.status(500).send({message: 'error creating the new user'})
    }
  },

  async getAll(req, res){
    try {
      const socialmedia = await SocialMedia.find()
      res.status(200).send(socialmedia)
    } catch (error) {
      console.log(error)
      res.status(500).send({message: 'error requesting data'})
    }
  }
}

module.exports = SocialMediaController