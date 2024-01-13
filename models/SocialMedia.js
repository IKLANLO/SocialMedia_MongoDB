const mongoose = require('mongoose')
const SocialMediaSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
  // posts se añadirá posteriormente
}, { timestamps: true })

const SocialMedia = mongoose.model('SocialMedia', SocialMediaSchema)

module.exports = SocialMedia