import * as React from 'react'
import { Game } from './game'
import { GameComponent } from './GameComponent'
import { compose, lifecycle, withStateHandlers } from 'recompose'

const app = ({ game }) => (
  <div id="app">
    <h1>Minesweepers</h1>
    {game ? <GameComponent game={game} /> : null}
  </div>
)

export const App = compose(
  withStateHandlers(
    {
      game: null
    },
    {
      setGame: () => game => ({ game })
    }
  ),
  lifecycle({
    componentDidMount() {
      const { setGame } = this.props
      setGame(new Game(20, 10, 50))
    }
  })
)(app)

// window.Game = Game
