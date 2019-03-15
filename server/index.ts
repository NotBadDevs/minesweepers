const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http, {
  transports: ['websocket']
})

const { Game } = require('./game')

const gameSettings = {
  field: [],
  width: 20,
  height: 10,
  bombCount: 10
}

const players = {}
const connections = {}
const games = {}

const broadcast = (event, data) =>
  Object.values(connections).forEach(connection => {
    // @ts-ignore
    connection.emit(event, data)
  })

io.on('connection', function(socket) {
  players[socket.id] = {
    id: socket.id,
    nick: `Guest #${Math.round(Math.random() * 10)}`
  }

  connections[socket.id] = socket
  games[socket.id] = new Game(gameSettings)

  socket.emit('game', games[socket.id])

  broadcast('players', players)

  socket.on('turn', function({ x, y }) {
    const game = games[socket.id]
    game.turn(x, y)
    socket.emit('game', game)
  })

  socket.on('changeNick', function({ nick }) {
    const player = players[socket.id]
    if (player) {
      player.nick = nick
    }

    broadcast('players', players)
  })

  socket.on('disconnect', function() {
    delete players[socket.id]
    delete connections[socket.id]
    delete games[socket.id]

    broadcast('players', players)
  })
})

http.listen(3000, function() {
  console.log('listening on *:3000')
})
