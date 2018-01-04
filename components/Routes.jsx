import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import Menu from './Menu';
import SignUp from './SignUp';
import Login from './Login';

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/menu" render={() => <Menu />} />
          <Route path="/login" render={() => <Login />} />
          <Route path="/signup" render={() => <SignUp />} />
        </Switch>
      </Router>
    );
  }
}
