require('dotenv').config()
const SocialMedia = require('../models/SocialMedia')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function checkUser(req, res){
  console.log('req.email', req.email, req.password)
  try {
    const resul = await SocialMedia.findOne({email: req.email})
    const isMatch = bcrypt.compareSync(req.password, resul.password)
    if (!isMatch) return res.status(400).send({message: `User or password doesn't exists, choose another email or password`})
    return resul
  } catch (error) {
    console.error(error)
  }
}

const SocialMediaController = {
  async createUser(req, res){
    try {
      const check = await checkUser(req.body)
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
      // añadida paginación
      const { page = 1, limit = 10 } = req.query
      const socialmedia = await SocialMedia.find()
      .limit(limit)
      .skip((page - 1) * limit)
      res.status(200).send(socialmedia)
    } catch (error) {
      console.log(error)
      res.status(500).send({message: 'error requesting data'})
    }
  },

  async login(req, res){
    try {
      const user = await checkUser(req.body)
      if (!user) return res.status(500).send({message: `User or password doesn't exists, choose another email or password`})
      const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
      if(user.tokens.length > 4) user.tokens.shift()
      user.tokens.push(token)
      await user.save()
      res.send({message: `Hello ${user.first_name}`, token, user})
    } catch (error) {
      console.log(error);
      res.status(500).send({message: 'Error creating the token'})
    }
  },

  async logout(req, res){
    try {
      await SocialMedia.findByIdAndUpdate(req.user._conditions._id, {
        $pull: { tokens: req.headers.authorization }
      })
      res.status(201).send({message: 'user disconnected successfully'})
    } catch (error) {
      console.log(error)
      res.status(500).send({message: 'Error trying to disconnect the user'})
    }
  },

  async getAllData(req, res){
    try {
      // añadida paginación
      const { page = 1, limit = 10 } = req.query
      const users = await SocialMedia.find().populate('postIds')
      .limit(limit)
      .skip((page - 1) * limit)
      res.status(200).send(users)
    } catch (error) {
      console.log(error)
      res.status(500).send({message: 'error requesting data'})
    }
  },

  async getUser(req, res) {
    try {
      const user = await SocialMedia.findOne({tokens: req.headers['authorization']})
      res.status(200).send(user)
    } catch (error) {
      res.status(500).send({message: 'error requesting data'})
    }
  }
}

module.exports = SocialMediaController