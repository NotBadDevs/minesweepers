import { pipe, curry } from 'ramda'

export const jsonClone = pipe(
  JSON.stringify,
  JSON.parse
)

export const mutableAppend = curry((array, target) => {
  target.splice(target.length, 0, ...array)
  return target
})
