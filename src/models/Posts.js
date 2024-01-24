const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId

const PostsSchema = new mongoose.Schema({
  userId: String,
  name: String,
  post: String,
  comments: [{
    userId: { type: ObjectId, ref: 'SocialMedia'},
    comment: String
  }],
  likes: [{ 
    userId: {type: ObjectId, ref: 'SocialMedia'} 
  }]
}, { timestamps: true })

const Posts = mongoose.model('Posts', PostsSchema)

module.exports = Posts