const SocialMedia = require('../models/SocialMedia')

const fieldsCheck = async (req, res, next) => {
  const fields = req.body
  if (!fields.first_name || !fields.last_name || !fields.email || !fields.password) {
    return res.status(401).send({message: 'All fields are required'})
  }
  next()
}

const postFieldsCheck = async (req, res, next) => {
  const fields = req.body
  if (!fields.name || !fields.post) return res.status(401).send({message: 'All fields are required'})
  next()
}

module.exports = { fieldsCheck, postFieldsCheck }