const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http, {
  transports: ['websocket']
})

const { Game } = require('./game')

const gameSettings = {
  field: [],
  width: 30,
  height: 10,
  bombCount: 30
}

const players = {}
const connections = {}
const games = {}
let game

const broadcast = (event, data) =>
  Object.values(connections).forEach(connection => {
    // @ts-ignore
    connection.emit(event, data)
  })

io.on('connection', function(socket) {
  players[socket.id] = {
    id: socket.id,
    nick: `Guest #${Math.round(Math.random() * 10)}`,
    status: ''
  }

  connections[socket.id] = socket
  games[socket.id] = new Game(gameSettings)

  if (!game || game.isFinished) {
    game = new Game(gameSettings)
    Object.values(players).forEach(player => {
      // @ts-ignore
      player.status = ''
    })
    broadcast('game', game)
  } else {
    socket.emit('game', game)
  }

  broadcast('players', players)

  socket.on('turn', function({ x, y }) {
    // const game = games[socket.id]
    game.turn(x, y)
    if (game.isFinished) {
      players[socket.id].status = game.isLost ? 'looser' : 'winner'
    }
    // socket.emit('game', game)
    broadcast('players', players)
    broadcast('game', game)
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
