import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Menu from './Menu'
import App from '../App'

export default class Routes extends Component {
  render () {
    return (
      <Switch>
        <Routes path="/menu" component={Menu} />
        <Route path="/" component={App} />
      </Switch>
    )
  }
}
