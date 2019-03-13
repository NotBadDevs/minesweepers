import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { compose, lifecycle, withStateHandlers } from 'recompose'

import { getRandom } from './utils/common'
import { gameOverMessages, gameWinMessages } from './const'
import { Game } from './game'
import { GameComponent } from './GameComponent'

const app = ({ store }) => (
  <div className="app">
    <h1>Minesweepers <span style={{fontSize: "10px", color:"red"}}>INDEV</span></h1>
    <GameComponent game={store.game} />
    {store.game.isLost && (
      <h2 className="game-over">
        {gameOverMessages[getRandom(0, gameOverMessages.length - 1)]}
      </h2>
    )}
    {store.game.isWon && <h2 className="game-win">{gameWinMessages[getRandom(0, gameWinMessages.length - 1)]}</h2>}
  </div>
)

export const App = compose(
  inject(store => ({ store })),
  lifecycle({
    componentDidMount() {
      const { store } = this.props
      store.game.setGame(new Game(20, 10, 10))
    }
  }),
  observer
)(app)
