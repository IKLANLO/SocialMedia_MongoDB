const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId

const PostsSchema = new mongoose.Schema({
  name: String,
  post: String,
  comments: [{
    userId: { type: ObjectId, ref: 'SocialMedia'},
    comment: String
  }]
}, { timestamps: true })

const Posts = mongoose.model('Posts', PostsSchema)

module.exports = Posts