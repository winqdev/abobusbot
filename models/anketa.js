const mongoose = require('mongoose')

const anketaSchema = new mongoose.Schema({
    username: String,
    skills: String,
    age: String,
    discord: String,
    region: String
})

module.exports = mongoose.model('anketa', anketaSchema)