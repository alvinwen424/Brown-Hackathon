import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import Register from './Register';
import Login from './Login';
import Checkout from './Checkout';
import Housing from './Housing';
import Requests from './Requests';
import SingleHome from './SingleHome';
import AuthRoute from './AuthRoute';
import Home from './Home';

export const Routes = ({ currentUser }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Home currentUser={currentUser} />}
        />
        <AuthRoute
          authed={currentUser}
          exact
          path="/home/:id"
          component={SingleHome}
        />
        <AuthRoute
          authed={currentUser}
          exact
          path="/housing"
          component={Housing}
        />
        <AuthRoute
          authed={currentUser}
          exact
          path="/requests"
          component={Requests}
        />
        <Route path="/login" render={() => <Login />} />
        <Route path="/register" render={() => <Register />} />
        <Route path="/checkout" render={() => <Checkout />} />
      </Switch>
    </Router>
  );
};
