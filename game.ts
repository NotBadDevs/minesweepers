import {
  includes,
  pipe,
  filter,
  reject,
  __,
  values,
  apply,
  forEach,
  tap,
  when,
  length,
  prop,
  either
} from 'ramda'

import { bind } from 'bind-decorator'
import { mutableAppend } from './utils/common'

class Cell {
  isOpen = false
  isBomb = false
  value = 0
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

  static getRandom(start, end) {
    return start + Math.round(Math.random() * end)
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

  private setBombs(bombCount) {
    while (bombCount) {
      const coord = {
        x: Game.getRandom(0, this.width - 1),
        y: Game.getRandom(0, this.height - 1)
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
        reject(either(this.cellIsOpen, includes(__, foundCells))),
        tap(mutableAppend(__, foundCells)),
        reject(this.cellValue),
        when(length, cells => this.openCells(cells, foundCells))
      )
    )
    return foundCells
  }

  turn(x, y) {
    const cell = this.getCell({ x, y })

    if (cell.isBomb) {
      this.isFinished = true
      cell.isOpen = true
    } else {
      if (cell.value) {
        cell.isOpen = true
      } else {
        this.openCells([{ x, y }]).forEach(c => (this.getCell(c).isOpen = true))
      }
    }
  }
}
