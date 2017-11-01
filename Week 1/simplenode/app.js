// app.js – entry point for Node.js application
const http = require('http')
const fs = require('fs')
const hostname = '127.0.0.1'
const port = '3000'

fs.readFile('index.html', (err, content) => {
  if (err) {
    console.error(err)
    throw err
  }

  const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-type', 'text/html')
    res.write(content)
  })
  server.listen(port, hostname, () => {
    console.log('Server started on port ' + port)
  })
})

