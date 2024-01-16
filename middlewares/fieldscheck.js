const SocialMedia = require('../models/SocialMedia')

const fieldsCheck = async (req, res, next) => {
  console.log(fields)
  if (!fields.first_name || !fields.last_name || !fields.email || !fields.password) {
    return res.status(401).send({message: 'All fields are required'})
  }
  next()
}

module.exports = { fieldsCheck }