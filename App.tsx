import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Game } from './game'
import { GameComponent } from './GameComponent'
import { compose, lifecycle, withStateHandlers } from 'recompose'
import { store } from './store'

const app = ({ game, store }) => (
  <div className="app">
    <h1>Minesweepers</h1>
    <GameComponent game={store.game} />
  </div>
)

export const App = compose(
  inject(store => ({ store })),
  lifecycle({
    componentDidMount() {
      const { store } = this.props
      const game = new Game(10, 5, 5)
      store.game.setGame(JSON.parse(JSON.stringify(game)))
    }
  }),
  observer
)(app)
