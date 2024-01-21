require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8081
const { dbConnection } = require('./config/config')

app.use(express.json())

dbConnection()

app.use('/socialmedia', require('./routes/socialmedia'))
app.use('/posts', require('./routes/post'))

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))