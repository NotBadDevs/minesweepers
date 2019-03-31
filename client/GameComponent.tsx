import * as React from 'react'
import { observer } from 'mobx-react'
import { compose } from 'recompose'

import './style.css'
import { gameOverMessages, gameWinMessages } from './const'
import { getRandom } from '../shared/utils'
import { Cell } from './Cell'

const cellSize = 31

const gameComponent = ({ game }) => {
  const elements = []
  for (let y = 0; y < game.height; y++)
    for (let x = 0; x < game.width; x++) {
      const cell = game.field[x][y]
      elements.push(
        <Cell
          cell={cell}
          key={`${x}-${y}`}
          onClick={() =>
            !game.isFinished && !cell.isOpen && !cell.isFlag && game.turn(x, y)
          }
          onContextMenu={() =>
            !game.isFinished && !cell.isOpen && game.toggleFlag(x, y)
          }
        />
      )
    }
  return (
    <React.Fragment>
      <div
        className="game noselect"
        style={{
          width: cellSize * game.width,
          height: cellSize * game.height
        }}
      >
        {elements}
      </div>
      {game.isLost && (
        <h2 className="game-over">
          {gameOverMessages[getRandom(0, gameOverMessages.length - 1)]}
        </h2>
      )}
      {game.isWon && (
        <h2 className="game-win">
          {gameWinMessages[getRandom(0, gameWinMessages.length - 1)]}
        </h2>
      )}
    </React.Fragment>
  )
}

export const GameComponent = compose(observer)(gameComponent)
