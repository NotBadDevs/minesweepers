import { types } from 'mobx-state-tree'
import { values as mobxValues } from 'mobx'

const User = types.model('User', {
  id: types.identifier,
  nick: ''
})

export const Users = types
  .model('Users', {
    items: types.optional(types.map(User), {})
  })
  .views(self => {
    return {
      get all() {
        return mobxValues(self.items)
      }
    }
  })
