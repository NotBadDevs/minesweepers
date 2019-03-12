import * as React from 'react'
import { observer } from 'mobx-react'
import { compose } from 'recompose'
import { defaultTo } from 'ramda'

import './style.css'
import { Cell } from './Cell'

const cellSize = 31

export const gameOverMessages = ["Aww snap!", "C'mon, there shouldn't have been a bomb here!", "Better luck next time!", "Use your intuition next time!", "Game over!", "Haha, you lost!", "You were a bad minesweeper.", "WHAT!?"]


const gameComponent = ({ game }) => {
  const elements = []
  for (let y = 0; y < game.height; y++)
    for (let x = 0; x < game.width; x++) {
      const cell = game.field[x][y]
      elements.push(
        <Cell
          cell={cell}
          key={`${x}-${y}`}
          x={x}
          y={y}
          onClick={() => !game.isFinished && game.turn(x, y)}
        />
      )
    }
  return (
    <div
      className="game noselect"
      style={{
        width: cellSize * game.width,
        height: cellSize * game.height
      }}
    >
      {elements}
    </div>
  )
}

export const GameComponent = compose(observer)(gameComponent)
