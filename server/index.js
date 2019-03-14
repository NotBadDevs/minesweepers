const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http, {
  transports: ['websocket']
})

const gameSettings = {
  field: [],
  width: 20,
  height: 10,
  bombCount: 10
}

const players = {}
const connections = {}

const broadcast = (event, data) =>
  Object.values(connections).forEach(connection => {
    connection.emit(event, data)
  })

io.on('connection', function(socket) {
  console.log(
    `\n \n CURRENT PLAYER LIST AFTER JOIN: ${JSON.stringify(players)}`
  )

  players[socket.id] = {
    id: socket.id,
    nick: `Guest #${Math.round(Math.random() * 10)}`
  }

  connections[socket.id] = socket

  broadcast('players', players)

  socket.on('turn', function(data) {
    console.log(data)
  })

  socket.on('gameover', function(data) {
    console.log(data)
  })

  socket.on('changeNick', function({ nick }) {
    const player = players[socket.id]
    if (player) {
      player.nick = nick
    }

    broadcast('players', players)

    console.log(`\n \n CURRENT PLAYER LIST: ${JSON.stringify(players)}`)
  })

  socket.on('disconnect', function() {
    delete players[socket.id]
    delete connections[socket.id]

    broadcast('players', players)

    console.log(
      `\n \n CURRENT PLAYER LIST AFTER LEAVE: ${JSON.stringify(players)}`
    )
  })

  console.log(`[${socket.id}] USER CONNECTED`)
})

http.listen(3000, function() {
  console.log('listening on *:3000')
})

console.log(
  `STARTING THE GAME WITH CONFIG: \n ${JSON.stringify(gameSettings)} \n`
)
