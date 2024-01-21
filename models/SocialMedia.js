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
  postIds: [{type: ObjectId, ref: 'Posts'}],
  wishList: [{ type: ObjectId, ref: 'Posts' }]
}, { timestamps: true })

SocialMediaSchema.methods.toJSON = function() {
  const user = this._doc
  delete user.tokens
  delete user.password
  return user
}

const SocialMedia = mongoose.model('SocialMedia', SocialMediaSchema)

module.exports = SocialMedia