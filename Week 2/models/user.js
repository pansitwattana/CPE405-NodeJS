// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose')
var Schema = mongoose.Schema

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model(
  'User',
  new Schema({
    id: { 
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true //<-- cut empty space
    },
    age: {
        type: Number,
        min: 13,
        max: 99
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: String,
    hashpassword: String,
    admin: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now()
    }
  })
)
