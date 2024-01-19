const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId

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
    match: [/.+\@.+\..+/],
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [],
  postIds: [{type: ObjectId, ref: 'Posts'}]
}, { timestamps: true })

const SocialMedia = mongoose.model('SocialMedia', SocialMediaSchema)

module.exports = SocialMedia