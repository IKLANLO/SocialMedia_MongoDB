require('dotenv').config()
const mongoose = require('mongoose')

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Database successfully connected')
  } catch (error) {
    console.error(error)
    throw new Error('Error initializing database')
  }
}

module.exports = { dbConnection }