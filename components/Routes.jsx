import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import Register from './Register';
import Login from './Login';
import Checkout from './Checkout'
import Housing from './Housing'
import Requests from './Requests'

export const Routes = ({ currentUser }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/housing" render={() => <Housing />} />
        <Route path="/requests" render={() => <Requests />} />
        <Route path="/login" render={() => <Login />} />
        <Route path="/register" render={() => <Register />} />
        <Route path="/checkout" render={() =>  <Checkout  />} />
      </Switch>
    </Router>
  );
};
