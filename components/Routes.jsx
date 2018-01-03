import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import hello from './hello';
import Menu from './Menu';
import Home from './Home';
import SignUpContainer from './SignUpContainer';
import LoginContainer from './LoginContainer';

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/menu" component={Menu} />
          <Route path="/login" component={LoginContainer} />
<Route path="/signup" component={SignUpContainer} />;          <Route path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}
