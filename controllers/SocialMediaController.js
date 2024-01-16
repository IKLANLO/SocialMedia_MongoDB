const SocialMedia = require('../models/SocialMedia')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../config/keys')

async function checkUser(req){
  return await SocialMedia.findOne({email: req})
}

const SocialMediaController = {
  async createUser(req, res){
    try {
      const check = await checkUser(req.body.email)
      if(check) return res.status(500).send({message: 'User already exists, choose another email'})
      if(!req.body.password) res.status(400).send({message: 'Password required'})
      const password = bcrypt.hashSync(req.body.password, 10)
      const user = await SocialMedia.create({...req.body, password})
      res.status(201).send({message: 'new user created successfully', user})
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
      const user = await checkUser(req.body.email)
      if (!user) return res.status(500).send({message: `User doesn't exists, choose another email`})
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