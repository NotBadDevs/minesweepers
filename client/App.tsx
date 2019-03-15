import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { compose, lifecycle, withStateHandlers } from 'recompose'

import { GameComponent } from './GameComponent'
import { Nickname } from './Nickname'
import { UserList } from './UserList'
import { service } from './service'

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
      service.on('game', game => {
        store.game.set(game)
      })
    }
  }),
  observer
)(app)
