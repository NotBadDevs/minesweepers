import io from 'socket.io-client'

import { SOCKET_IO_PORT } from '../shared/const'

export const service = io(
  process.env.NODE_ENV === 'development'
    ? `http://localhost:${SOCKET_IO_PORT}`
    : `http://cubie.dns-cloud.net:${SOCKET_IO_PORT}/`,
  { transports: ['websocket'] }
)
