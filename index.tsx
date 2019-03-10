import * as React from 'react'
import {render as DOMrender} from 'react-dom'

import { App } from './App'

const root = document.getElementById('root')

export const render = () => {
    DOMrender(<App />, root)
}

render()

