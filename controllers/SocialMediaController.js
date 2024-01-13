const SocialMedia = require('../models/SocialMedia')

const SocialMediaController = {
  async createUser(req, res){
    try {
      const socialmedia = await SocialMedia.create(req.body)
      res.status(201)
      res.send({message: 'new user created successfully'})
    } catch (error) {
      console.error(error)
      res.status(500).send({message: 'Error creating the new user'})
    }
  }
}

module.exports = SocialMediaController