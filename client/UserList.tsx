import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { compose, lifecycle } from 'recompose'
import { store } from './store'
import { service } from './service'

const userList = ({ store }) => (
  <div className="user-list">
    <h3>User list</h3>
    <ul>
      {store.usersStore.all.map((user, i) => (
        <li key={i}>{user.nick}</li>
      ))}
    </ul>
  </div>
)

export const UserList = compose(
  inject(store => ({ store })),
  lifecycle({
    componentDidMount() {
      const { store } = this.props

      service.on('players', players => {
        store.usersStore.items = players
      })
    }
  }),
  observer
)(userList)
