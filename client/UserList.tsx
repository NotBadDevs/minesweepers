import * as React from 'react'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import classnames from 'classnames'

import { service } from './service'
import { useStore } from './hooks'

export const UserList = observer(() => {
  const store = useStore()
  const [currentUserId, setCurrentUserId] = useState()

  useEffect(() => {
    service.on('players', (players) => {
      store.usersStore.set(players)
    })
    service.on('connect', () => {
      setCurrentUserId(service.id)
    })
  }, [])

  return (
    <div className="user-list">
      <h3>User list</h3>
      <ul>
        {store.usersStore.all.map((user, i) => (
          <li
            key={i}
            className={classnames({
              current: user.id === currentUserId,
              winner: user.status === 'winner',
              looser: user.status === 'looser',
            })}
          >
            {user.nick}
          </li>
        ))}
      </ul>
    </div>
  )
})
