import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { compose, lifecycle, withStateHandlers } from 'recompose'
import classnames from 'classnames'

import { service } from './service'

const userList = ({ store, currentUserId }) => (
  <div className="user-list">
    <h3>User list</h3>
    <ul>
      {store.usersStore.all.map((user, i) => (
        <li
          key={i}
          className={classnames({
            current: user.id === currentUserId,
            winner: user.status === 'winner',
            looser: user.status === 'looser'
          })}
        >
          {user.nick}
        </li>
      ))}
    </ul>
  </div>
)

export const UserList = compose(
  withStateHandlers(
    {
      currentUserId: null
    },
    {
      setCurrentUserId: () => currentUserId => ({
        currentUserId
      })
    }
  ),
  inject(store => ({ store })),
  lifecycle({
    componentDidMount() {
      const { store, setCurrentUserId } = this.props

      service.on('players', players => {
        store.usersStore.items = players
      })
      service.on('connect', () => {
        setCurrentUserId(service.id)
      })
    }
  }),
  observer
)(userList)
