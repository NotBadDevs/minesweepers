import * as React from 'react'
import { observer } from 'mobx-react'

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

export const Cell = observer(({ cell, onClick, onContextMenu }) => {
  const type = cell.isFlag
    ? 'flag'
    : !cell.isOpen
    ? 'closed'
    : cell.isBomb
    ? 'bomb'
    : cell.value
    ? 'number'
    : 'empty'
  return (
    <div
      className={`cell ${cell.isOpen ? 'open' : ''}`}
      style={{
        color: type === 'number' ? numberColors[cell.value] : 'inherit',
      }}
      onClick={onClick}
      onContextMenu={(e) => {
        onContextMenu()
        e.preventDefault()
      }}
    >
      {cell.isOpen &&
        {
          bomb: <span>💣</span>,
          number: <React.Fragment>{cell.value}</React.Fragment>,
        }[type]}
      {!cell.isOpen &&
        {
          flag: <span>🚩</span>
        }[type]}
    </div>
  )
})
