class Cell {
  isBomb = false
  value = 0
  isRevealed = false
}

export class Game {
  field = []
  width = 0
  height = 0
  isFinished = false

  constructor(width, height, bombCount) {
    this.createField(width, height)
    this.setBombs(bombCount)
  }

  createField(width, height) {
    this.width = width
    this.height = height
    for (let x = 0; x < width; x++) {
      this.field[x] = []
      for (let y = 0; y < height; y++) {
        this.field[x][y] = new Cell()
      }
    }
  }

  setBombs(bombCount) {
    let x, y, cell
    while (bombCount) {
      x = Game.getRandom(0, this.width - 1)
      y = Game.getRandom(0, this.height - 1)
      cell = this.field[x][y]
      if (!cell.isBomb) {
        this.setBomb(x, y)
        bombCount--
      }
    }
  }

  setBomb(x, y) {
    this.field[x][y].isBomb = true
    this.getNeighbours(x, y).forEach(cell => {
      cell.value++
    })
  }

  getNeighbours(x, y) {
    const neighbours = []
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (
          i >= 0 &&
          i < this.width &&
          j >= 0 &&
          j < this.height &&
          !(i === x && j === y)
        ) {
          neighbours.push(this.field[i][j])
        }
      }
    }
    return neighbours
  }

  static getRandom(start, end) {
    return start + Math.round(Math.random() * end)
  }
}
