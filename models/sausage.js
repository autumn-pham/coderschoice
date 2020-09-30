const mongoose = require('mongoose')

const sausageSchema = new mongoose.Schema({
  name: String,
  image: String,
  country: String,
  description: String
})

const Sausage = mongoose.model('Sausage', sausageSchema)

module.exports = Sausage
