import * as React from 'react'
import { observer } from 'mobx-react'
import { compose } from 'recompose'

const numberColors = [
  'transparent',
  '#0000ff',
  '#008100',
  '#ff1300',
  '#000083',
  '#810500',
  '#2a9494',
  '#000000',
  '#808080'
]

const cell = ({ cell, onClick, x, y }) => (
  <div
    data-coords={`${x}-${y}`}
    className={`cell ${cell.isRevealed ? 'revealed' : ''}`}
    style={{
      color: cell.isBomb ? 'inherit' : numberColors[cell.value]
    }}
    onClick={onClick}
  >
    {cell.isRevealed ? (
      cell.isBomb ? (
        <span>💣</span>
      ) : cell.value ? (
        cell.value
      ) : (
        ''
      )
    ) : (
      ''
    )}
  </div>
)

export const Cell = compose(observer)(cell)
