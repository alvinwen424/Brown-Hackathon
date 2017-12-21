import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import App from '~/App'
import hello from './hello'
import Menu from './Menu'

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/hello" component={hello} />
        <Route path="/menu" component={Menu} />
        <Route path="/" component={App} />
      </Switch>
    )
  }
}
