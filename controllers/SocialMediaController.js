const SocialMedia = require('../models/SocialMedia')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../config/keys')

const SocialMediaController = {
  async createUser(req, res){
    try {
      await SocialMedia.create(req.body)
      res.status(201).send({message: 'new user created successfully!!!'})
    } catch (error) {
      console.error(error)
      res.status(500).send({message: 'error creating the new user'})
    }
  },

  async getAll(req, res){
    try {
      // console.log('holaaa');
      const socialmedia = await SocialMedia.find()
      res.status(200).send(socialmedia)
    } catch (error) {
      console.log(error)
      res.status(500).send({message: 'error requesting data'})
    }
  },

  async login(req, res){
    try {
      const user = await SocialMedia.findOne({
        email: req.body.email
      })
      
      const token = jwt.sign({_id: user._id}, jwt_secret)
      if(user.tokens.length > 4) user.tokens.shift()
      user.tokens.push(token)
      await user.save()
      res.send({message: `Hello ${user.first_name}`, token})
    } catch (error) {
      console.log(error);
      res.status(500).send({message: 'Error creating the token'})
    }
  }
}

module.exports = SocialMediaController