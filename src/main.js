import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin();
ReactDOM.render(<Root />, document.getElementsByTagName('app')[0]);
