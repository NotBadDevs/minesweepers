var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', function(req, res) {
  res.send('<h1>Hello world</h1>')
})

http.listen(3000, function() {
  console.log('listening on *:3000')
})
