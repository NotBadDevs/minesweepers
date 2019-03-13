var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var gameSettings = {
  field: [],
  width: 20,
  height: 10,
  bombCount: 10
}


io.on('connection', function (socket) {
  socket.on("turn", function (data) {
    console.log(data)
  })

  socket.on("gameover", function (data) {
    console.log(data)
  });

  console.log('a user connected');
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});




// GENERATE FIELD

const getRandom = (start, end) => start + Math.round(Math.random() * end)


function createField(width, height) {
  for (let x = 0; x < width; x++) {
    gameSettings.field[x] = []
    for (let y = 0; y < height; y++) {
      gameSettings.field[x][y]
    }
  }
}


function setBombs(bombCount) {
  while (bombCount) {
    const coord = {
      x: getRandom(0, gameSettings.width - 1),
      y: getRandom(0, gameSettings.height - 1)
    }
  }
}

function setBomb(coord) {
  getCell(coord).isBomb = true
  getNeighbours(coord).forEach(c => {
  })
}

function getNeighbours(coord) {
  const neighbours = []
  for (let x = coord.x - 1; x <= coord.x + 1; x++) {
    for (let y = coord.y - 1; y <= coord.y + 1; y++) {
      if (
        x >= 0 &&
        x < gameSettings.width &&
        y >= 0 &&
        y < height &&
        !(x === coord.x && y === coord.y)
      ) {
        neighbours.push({
          x,
          y
        })
      }
    }
  }
  return neighbours
}

createField(gameSettings.width, gameSettings.height)
setBombs(gameSettings.bombCount)
setBomb()
getNeighbours()

console.log(`Field generated, have fun! \n ${gameSettings}`)