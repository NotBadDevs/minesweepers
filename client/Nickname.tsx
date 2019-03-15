import * as React from 'react'
import { compose, withStateHandlers, withProps, lifecycle } from 'recompose'

import { service } from './service'

const nickname = ({ nick, updateNick, setNick }) => (
  <div className="nickname">
    <input
      type="text"
      placeholder="Your nickname"
      value={nick}
      onChange={e => updateNick(e.target.value)}
      maxLength={20}
    />
    <button onClick={() => setNick(nick)}>Set</button>
  </div>
)

export const Nickname = compose(
  withStateHandlers(
    {
      nick: ''
    },
    {
      updateNick: () => nick => {
        sessionStorage.setItem('nick', nick)
        return { nick }
      }
    }
  ),
  withProps(() => ({
    setNick: nick => service.emit('changeNick', { nick })
  })),
  lifecycle({
    componentDidMount() {
      const { updateNick, setNick } = this.props
      const nick = sessionStorage.getItem('nick')
      updateNick(nick)
      service.on('connect', () => setNick(nick))
    }
  })
)(nickname)
