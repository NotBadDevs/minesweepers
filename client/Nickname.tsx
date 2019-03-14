import * as React from 'react'
import { compose, withStateHandlers, withProps } from 'recompose'

import { service } from './service'

const nickname = ({ nick, updateNick, setNick }) => (
  <div className="nickname">
    <input
      type="text"
      placeholder="Your nickname"
      value={nick}
      onChange={updateNick}
      maxLength={20}
    />
    <button onClick={setNick}>Set</button>
  </div>
)

export const Nickname = compose(
  withStateHandlers(
    {
      nick: ''
    },
    {
      updateNick: () => e => ({
        nick: e.target.value
      })
    }
  ),
  withProps(({ nick }) => ({
    setNick: () => service.emit('changeNick', { nick })
  }))
)(nickname)
