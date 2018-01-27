import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import Register from './Register';
import Login from './Login';
import Checkout from './Checkout'

export const Routes = ({ currentUser }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" render={() => <Login />} />
        <Route path="/register" render={() => <Register />} />
        <Route path="/checkout" render={() =>  <Checkout  />} />
      </Switch>
    </Router>
  );
};
