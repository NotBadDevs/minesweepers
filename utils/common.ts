import { pipe } from 'ramda'

export const jsonClone = pipe(
  JSON.stringify,
  JSON.parse
)
