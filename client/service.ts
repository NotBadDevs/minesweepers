import io from 'socket.io-client'

export const service = io('http://localhost:7777', {
  transports: ['websocket']
})
