var mongoose = require('mongoose')
var Post = require('../models/post')
var config = require('../config')

exports.getPosts = (req, res) => {
    const id = req.params.id
    if (id) {
        Post.find({ id }, (err, post) => {
            if (err) throw err
            res.json(post)
        })
    }
    else {
        Post.find((err, posts) => {
            if (err) throw err
            res.json(posts)
        })
    }
}