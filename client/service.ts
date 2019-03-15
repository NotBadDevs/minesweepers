import io from 'socket.io-client'

export const service = io('http://localhost:3000', {
  transports: ['websocket']
})
