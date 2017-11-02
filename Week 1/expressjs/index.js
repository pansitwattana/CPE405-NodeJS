var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://admin:admin@ds243285.mlab.com:43285/customer_lab'
// var { users } = require('./users')
let users = []

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//static content
//javascript eg. vuejs, angularjs

app.get('/', (req, res) => {
    MongoClient.connect(url)
        .then((db) => {
            return db.collection('users').find().toArray()
        })
        .then((usersData) => {
            // return items
            users = usersData
            res.render('index', {
                title: 'Customer List:',
                users: usersData
            })
        })
})

// app.get('/user', (req, res) => {
//     res.json(users)
// })

app.get('/hey', (req, res) => {
    res.send('Hello Wolrd')
})

app.post('/hey', (req, res) => {
    res.send('Posted from hey')
})

app.post('/user/add', (req, res) => {
    var newUser = {
        name: req.body.name,
        age: parseInt(req.body.age),
        email: req.body.email,
    }
    users.push(newUser)
    res.render('index', {
        title: 'Customer List',
        users: users
    })
})

app.get('/user/:id', (req, res) => {
    let id = req.params.id

    MongoClient.connect(url)
        .then((db) => {
            return db.collection('users').find({ id: 3 }).toArray()
        })
        .then((data) => {
            console.log(data)
            if (data.length > 0) {
                let user = data[0]
                console.log(user)
                res.render('user', {
                    id,
                    age: user.age,
                    email: user.email
                })
            }
            else {
                res.render('user', {
                    id
                })
            }
        })
        .catch((error) => {
            console.error(error)
        })
    
    
})

app.post('/user', (req, res) => {
    // console.log('rec')
    let newUser = {
        name: req.body.name,
        age: parseInt(req.body.age),
        email: req.body.email,
    }
    // console.log(newUser)
    MongoClient.connect(url)
        .then((db) => {
            return db.collection('users').insertOne(newUser)
        })
        .then(() => {
            // console.log(res)
            users.push(newUser)
            res.render('index', {
                title: 'Customer List',
                users: users
            })
        })
        .catch((err) => {
            return err
        })

    // users.push(newUser)
})


app.listen(3000, () => {
    console.log('Start Server')
})