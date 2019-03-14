import { types, unprotect } from 'mobx-state-tree'
import makeInspectable from 'mobx-devtools-mst'
import { defaultTo, dissocPath, pick, pipe } from 'ramda'

import { Game } from './game'
import { Users } from './users'

const Store = types.model('Store', {
  game: types.optional(Game, {}),
  usersStore: types.optional(Users, {})
})

export const store = Store.create({
  game: {},
  usersStore: {}
})

if (process.env.NODE_ENV === 'development') {
  ;(<any>window).store = store
  makeInspectable(store)
  unprotect(store)
  // setLivelynessChecking('error')
}
