const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId

const PostsSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: 'SocialMedia'
  },
  post: String
}, { timestamps: true })

const Posts = mongoose.model('Posts', PostsSchema)

module.exports = Posts