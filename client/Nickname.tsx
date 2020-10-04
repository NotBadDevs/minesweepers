import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'

import { service } from './service'

export const Nickname = () => {
  const [nick, setNick] = useState('')

  const storeNick = useCallback((nick) => {
    sessionStorage.setItem('nick', nick)
    service.emit('changeNick', { nick })
  }, [])
  const handleChange = useCallback((e) => {
    setNick(e.target.value)
  }, [])

  useEffect(() => {
    const nick = sessionStorage.getItem('nick')
    setNick(nick)
    service.on('connect', () => storeNick(nick))
  }, [])

  return (
    <div className="nickname">
      <input
        type="text"
        placeholder="Your nickname"
        value={nick}
        onChange={handleChange}
        maxLength={20}
      />
      <button onClick={() => storeNick(nick)}>Set</button>
    </div>
  )
}
