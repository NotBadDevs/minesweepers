import io from 'socket.io-client'
import { store } from './store'

export const service = io('http://localhost:3000', {
  transports: ['websocket']
})

service.on('players', players => {
  store.usersStore.items = players
})
