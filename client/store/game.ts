import { types } from 'mobx-state-tree'
import { merge, pick } from 'ramda'

import { jsonClone } from '../../utils/common'
import { service } from '../service'

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

    bombCount: 0,
    cellsLeft: 0,

    isFinished: false,
    isWon: false,
    isLost: false,

    field: types.optional(
      // @ts-ignore
      types.array(types.optional(types.array(types.optional(Cell, {})), [])),
      []
    )
  })
  .actions(self => {
    const turn = (x, y) => {
      service.emit('turn', { x, y })
    }

    const toggleFlag = (x, y) => {
      const cell = self.field[x][y]
      // @ts-ignore
      cell.isFlag = !cell.isFlag
    }

    const set = data => {
      for (let x = 0; x < data.width; x++) {
        for (let y = 0; y < data.height; y++) {
          // cant read from MST array above bounds, so check length first
          // @ts-ignore
          self.field[x] = x === self.field.length ? [] : self.field[x]
          self.field[x][y] = y === self.field[x].length ? {} : self.field[x][y]
          // merge to preserve flags on UI
          self.field[x][y] = merge(self.field[x][y], data.field[x][y])
        }
      }
      Object.assign(
        self,
        pick(
          [
            'width',
            'height',
            'bombCount',
            'cellsLeft',
            'isFinished',
            'isWon',
            'isLost'
          ],
          data
        )
      )
    }

    return { set, turn, toggleFlag }
  })
