import { types } from 'mobx-state-tree'

export const Cell = types.model('Cell', {
  isBomb: false,
  isRevealed: false,
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
    const setGame = game => Object.assign(self, game)

    const turn = (x, y) => {
      self.field[x][y].isRevealed = true
    }

    return { setGame, turn }
  })
