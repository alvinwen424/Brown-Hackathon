import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import Menu from './Menu';
import Register from './Register';
import Login from './Login';

export const Routes = ({ currentUser }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Menu currentUser={currentUser} />}
        />
        <Route path="/menu" render={() => <Menu />} />
        <Route path="/login" render={() => <Login />} />
        <Route path="/register" render={() => <Register />} />
      </Switch>
    </Router>
  );
};
