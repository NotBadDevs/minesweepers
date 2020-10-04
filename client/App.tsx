import * as React from 'react'
import { useEffect } from 'react'
import { observer } from 'mobx-react'

import { GameComponent } from './GameComponent'
import { Nickname } from './Nickname'
import { UserList } from './UserList'
import { service } from './service'
import { useStore } from './hooks'

export const App = observer(() => {
  const store = useStore()

  useEffect(() => {
    service.on('game', (game) => store.game.set(game))
  }, [])

  return (
    <div className="app">
      <h1>
        Minesweepers
        <span style={{ fontSize: '10px', color: 'red' }}>ALPHA</span>
      </h1>
      <GameComponent game={store.game} />
      <Nickname />
      <UserList />
    </div>
  )
})
