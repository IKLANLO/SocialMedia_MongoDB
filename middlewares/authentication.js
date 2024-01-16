const SocialMedia = require('../models/SocialMedia')
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
    return res.status(500).send({message: 'An error occurred with the token'})
  }
}

module.exports = { authentication }