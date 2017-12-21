import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import Routes from './components/Routes.jsx'
import { Router } from 'react-router-dom'
import history from './history'

// import App from '~/App'
function main() {
  render(
    <AppContainer>
      <Router history={history} >
        <Routes />
      </Router>
    </AppContainer>,
    document.getElementById('main'))
}

main()

module.hot && module.hot.accept('~/App', main)
