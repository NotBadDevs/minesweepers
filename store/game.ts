import { types } from 'mobx-state-tree'

import { jsonClone } from '../utils/common'

const instance = {
  game: null
}

export const Cell = types.model('Cell', {
  isBomb: false,
  isOpen: false,
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

    const updateGameStore = () => Object.assign(self, jsonClone(instance.game))

    return { setGame, turn }
  })
