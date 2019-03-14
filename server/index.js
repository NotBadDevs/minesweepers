var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var gameSettings = {
  field: [],
  width: 20,
  height: 10,
  bombCount: 10
}

var userTag;

var players = []



io.on('connection', function (socket) {
  userTag = `[${socket.id}]`

  players.push({id: socket.id, nick: " "})

  socket.on("turn", function (data) {
    console.log(data)
  })

  socket.on("gameover", function (data) {
    console.log(data)
  });

  socket.on("changeNick", function (data) {
    console.log(`${userTag} CHANGED THEIR NICK TO: ${data}`)
  })

  console.log(`${userTag} USER CONNECTED`);
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});


console.log(`STARTING THE GAME WTIH CONFIG: \n ${JSON.stringify(gameSettings)} \n`)