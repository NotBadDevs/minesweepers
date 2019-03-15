import io from 'socket.io-client'

export const service = io('http://89.74.178.61:7777', {
  transports: ['websocket']
})
