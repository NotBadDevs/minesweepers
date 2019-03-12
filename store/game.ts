import { types } from 'mobx-state-tree'
import { merge } from 'ramda'

import { jsonClone } from '../utils/common'

const instance = {
  game: null
}

export const Cell = types.model('Cell', {
  isOpen: false,
  isFlag: false,
  isBomb: false,
  value: 0
})

export const Game = types
  .model('Game', {
    width: 0,
    height: 0,
    isFinished: false,
    field: types.optional(
      types.array(types.optional(types.array(types.optional(Cell, {})), [])),
      []
    )
  })
  .actions(self => {
    const setGame = game => {
      instance.game = game
      updateGameStore()
    }

    const turn = (x, y) => {
      instance.game.turn(x, y)
      updateGameStore()
    }

    const toggleFlag = (x, y) => {
      const cell = self.field[x][y]
      cell.isFlag = !cell.isFlag
    }

    const updateGameStore = () => {
      const instanceData = jsonClone(instance.game)
      for (let x = 0; x < instanceData.width; x++) {
        for (let y = 0; y < instanceData.height; y++) {
          // cant read from MST array above bounds, so check length first
          self.field[x] = x === self.field.length ? [] : self.field[x]
          self.field[x][y] = y === self.field[x].length ? {} : self.field[x][y]
          // merge to preserve flags on UI
          self.field[x][y] = merge(self.field[x][y], instanceData.field[x][y])
        }
      }
      self.width = instanceData.width
      self.height = instanceData.height
      self.isFinished = instanceData.isFinished
    }

    return { setGame, turn, toggleFlag }
  })
