var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

var gameSettings = {
  field: [],
  width: 20,
  height: 10,
  bombCount: 10
}

var userTag

var players = []

io.on('connection', function(socket) {
  userTag = `[${socket.id}]`
  console.log(`\n \n CURRENT PLAYER LIST AFTER JOIN: ${JSON.stringify(players)}`)
  players.push({
    id: socket.id,
    nick: `Guest #${Math.round(Math.random() * 10)}`
  })

  socket.on('turn', function(data) {
    console.log(data)
  })

  socket.on('gameover', function(data) {
    console.log(data)
  })

  socket.on('changeNick', function(data) {
    var nick = data.split(',')[0]
    console.log(
      `${data.split(',')[1]} CHANGED THEIR NICK TO: ${data.split(',')[0]}`
    )
    console.log(`\n \n CURRENT PLAYER LIST: ${JSON.stringify(players)}`)

    for (var i = 0; i < players.length; i++) {
      if (players[i].id == data.split(',')[1]) {
        players[i].nick = nick
      }
    }
  })

  socket.on('disconnect', function() {
    console.log(`\n \n CURRENT PLAYER LIST AFTER LEAVE: ${JSON.stringify(players)}`)
    for (var i = 0; i < players.length; i++) {
      if (players[i].id == socket.id) {
        players.splice(players[i], 1)
      }

      if(players.length = 1) {
        console.log("MULTIPLAYER GAME ENDED") // Здесь триггериться конец игры когда кол-во игроков = 0
      }
    }
  })

  console.log(`${userTag} USER CONNECTED`)
})

http.listen(3000, function() {
  console.log('listening on *:3000')
})

console.log(
  `STARTING THE GAME WITH CONFIG: \n ${JSON.stringify(gameSettings)} \n`
)
