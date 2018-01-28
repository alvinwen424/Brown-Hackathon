import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import firebase, { auth } from '~/fire';

export default function AuthRoute({ component: Component, authed, path }) {
  return (
    <Route
      path={path}
      render={props =>
        authed !== null
          ? <Component currentUser={authed} {...props} />
          : <Redirect
              to={{ pathname: '/', state: { from: props.location } }}
            />}
    />
  );
}
