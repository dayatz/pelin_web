import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'
import injectTapEventPlugin from 'react-tap-event-plugin'

require('./styles/style.css');

injectTapEventPlugin();
ReactDOM.render(<Root />, document.getElementsByTagName('app')[0]);
