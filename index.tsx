import * as React from 'react'
import { Provider } from 'mobx-react'
import { render as domRender } from 'react-dom'

import { store } from './store'

import { App } from './App'

const root = document.getElementById('root')

const WrappedApp = () => (
  <Provider {...store}>
    <App />
  </Provider>
)

export const render = () => {
  domRender(<WrappedApp />, root)
}

render()
