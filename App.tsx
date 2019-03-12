import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { compose, lifecycle, withStateHandlers } from 'recompose'

import { Game } from './game'
import { GameComponent, gameOverMessages } from './GameComponent'

const app = ({ store }) => (
  <div className="app">
    <h1>Minesweepers</h1>
    <GameComponent game={store.game} />
    {store.game.isLost && <h2 className="game-over">{gameOverMessages[Math.round(Math.random() * gameOverMessages.length - 1)]}</h2>}
    {store.game.isWon && <h2 className="game-win">Win! Win! Win!</h2>}
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
