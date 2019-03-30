import io from 'socket.io-client'

export const service = io(
  process.env.NODE_ENV === 'production'
    ? 'http://cubie.dns-cloud.net:7777/'
    : 'http://localhost:7777',
  { transports: ['websocket'] }
)
