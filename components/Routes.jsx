import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import App from '~/App'
import hello from './hello'

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/hello" component={hello} />
        <Route path="/" component={App} />
      </Switch>
    )
  }
}
