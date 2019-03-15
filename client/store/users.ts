import { types } from 'mobx-state-tree'
import { values as mobxValues } from 'mobx'

const User = types.model('User', {
  id: types.identifier,
  nick: '',
  status: ''
})

export const Users = types
  .model('Users', {
    items: types.optional(types.map(User), {})
  })
  .actions(self => {
    const set = items => {
      self.items = items
    }
    return { set }
  })
  .views(self => {
    return {
      get all() {
        return mobxValues(self.items)
      }
    }
  })
