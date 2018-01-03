import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import hello from './hello';
import Menu from './Menu';
import Home from './Home';

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/hello" component={hello} />
          <Route path="/menu" component={Menu} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}
