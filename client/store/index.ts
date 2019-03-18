import { types } from 'mobx-state-tree'
import makeInspectable from 'mobx-devtools-mst'

import { Game } from './game'
import { Users } from './users'

const Store = types.model('Store', {
  // @ts-ignore
  game: types.optional(Game, {}),
  // @ts-ignore
  usersStore: types.optional(Users, {})
})

export const store = Store.create({
  game: {},
  usersStore: {}
})

if (process.env.NODE_ENV === 'development') {
  ;(<any>window).store = store
  makeInspectable(store)
  // unprotect(store)
  // setLivelynessChecking('error')
}
