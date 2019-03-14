import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'

const userList = ({ users = [] }) => (
  <div className="user-list">
    <h3>User list</h3>
    <ul>
      {users.map((user, i) => (
        <li key={i}>{user.nick}</li>
      ))}
    </ul>
  </div>
)

export const UserList = compose(
  inject(store => ({
    users: store.usersStore.all
  })),
  observer
)(userList)
