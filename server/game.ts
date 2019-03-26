import { __, either, includes, length, pipe, reject, tap, when } from 'ramda'
import { bind } from 'bind-decorator'

import { getRandom, mutableAppend } from 'minesweeper-shared/utils'

class Cell {
  isOpen = false
  isBomb = false
  value = 0
}

export class Game {
  field = []
  width = 0
  height = 0
  bombCount = 0
  cellsLeft = 0
  isFinished = false
  isWon = false
  isLost = false

  constructor(options) {
    this.width = options.width
    this.height = options.height
    this.bombCount = options.bombCount
    this.cellsLeft = this.width * this.height

    this.createField(this.width, this.height)
    this.setBombs(this.bombCount)
  }

  createField(width, height) {
    for (let x = 0; x < width; x++) {
      this.field[x] = []
      for (let y = 0; y < height; y++) {
        this.field[x][y] = new Cell()
      }
    }
  }

  private setBombs(bombCount) {
    while (bombCount) {
      const coord = {
        x: getRandom(0, this.width - 1),
        y: getRandom(0, this.height - 1)
      }
      if (!this.getCell(coord).isBomb) {
        this.setBomb(coord)
        bombCount--
      }
    }
  }

  private setBomb(coord) {
    this.getCell(coord).isBomb = true
    this.getNeighbours(coord).forEach(c => {
      this.getCell(c).value++
    })
  }

  @bind
  private getNeighbours(coord) {
    const neighbours = []
    for (let x = coord.x - 1; x <= coord.x + 1; x++) {
      for (let y = coord.y - 1; y <= coord.y + 1; y++) {
        if (
          x >= 0 &&
          x < this.width &&
          y >= 0 &&
          y < this.height &&
          !(x === coord.x && y === coord.y)
        ) {
          neighbours.push({ x, y })
        }
      }
    }
    return neighbours
  }

  @bind
  private getCell(coord) {
    return this.field[coord.x][coord.y]
  }

  @bind
  private cellIsOpen(coord) {
    return this.getCell(coord).isOpen
  }

  @bind
  private cellValue(coord) {
    return this.getCell(coord).value
  }

  private openCells(cells, foundCells = []) {
    cells.forEach(
      pipe(
        this.getNeighbours,
        // @ts-ignore
        reject(either(this.cellIsOpen, includes(__, foundCells))),
        tap(mutableAppend(__, foundCells)),
        reject(this.cellValue),
        when(
          pipe(
            length,
            Boolean
          ),
          cells => this.openCells(cells, foundCells)
        )
      )
    )
    return foundCells
  }

  turn(x, y) {
    const cell = this.getCell({ x, y })
    if (cell.isBomb) {
      this.isFinished = true
      this.isLost = true
      cell.isOpen = true
    } else {
      if (cell.value) {
        cell.isOpen = true
        this.cellsLeft--
      } else {
        const cellsToOpen = this.openCells([{ x, y }])
        cellsToOpen.forEach(c => (this.getCell(c).isOpen = true))
        this.cellsLeft -= cellsToOpen.length
      }
    }
    if (this.cellsLeft === this.bombCount) {
      this.isFinished = true
      this.isWon = true
    }
  }
}
