import * as React from 'react'
import { defaultTo } from 'ramda'

import './style.css'
import { Cell } from './Cell'

const cellSize = 31

export const GameComponent = ({ game }) => {
  console.log(game)
  const elements = []
  for (let y = 0; y < game.height; y++)
    for (let x = 0; x < game.width; x++) {
      const cell = game.field[x][y]
      elements.push(
        <Cell cell={cell} key={`${x}-${y}`} onClick={() => game.turn(x, y)} />
      )
    }
  return (
    <div
      id="game"
      className="noselect"
      style={{
        width: cellSize * game.width,
        height: cellSize * game.height
      }}
    >
      {elements}
    </div>
  )
}
