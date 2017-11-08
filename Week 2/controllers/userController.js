var mongoose = require('mongoose')
var User = require('../models/user')
var config = require('../config')

exports.getUsers = (req, res) => {
    User.find((err, users) => {
        if (err) throw err
        res.json(users)
    })
}

exports.getUsersCb = (callback, limit) => {
    User.find(callback).limit(limit)
}

exports.getUserById = (id, callback) => {
    User.find({ id }, callback)
}