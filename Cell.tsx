import * as React from 'react'

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

export const Cell = ({ cell }) => (
  <div
    className="cell"
    style={{
      color: numberColors[cell.value]
    }}
  >
    {cell.isBomb ? <span>💣</span> : cell.value ? cell.value : ''}
  </div>
)
