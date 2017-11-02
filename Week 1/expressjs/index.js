var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var { users } = require('./users')

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//static content
//javascript eg. vuejs, angularjs

app.get('/', (req, res) => {
    //open in public path
})

app.get('/ejs', (req, res) => {
    res.render('index', {
        title: 'Customer List:',
        users: users
    })
})

app.get('/user', (req, res) => {
    res.json(users)
})

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

app.listen(3000, () => {
    console.log('Start Server')
})