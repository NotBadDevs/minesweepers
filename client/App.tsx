import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { compose, lifecycle, withStateHandlers } from 'recompose'

import { Game } from './game'
import { GameComponent } from './GameComponent'
import { Nickname } from './Nickname'
import { UserList } from './UserList'

const app = ({ store }) => (
  <div className="app">
    <h1>
      Minesweepers <span style={{ fontSize: '10px', color: 'red' }}>INDEV</span>
    </h1>
    <GameComponent game={store.game} />
    <Nickname />
    <UserList />
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
