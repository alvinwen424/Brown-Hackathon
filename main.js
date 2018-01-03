import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Routes from './components/Routes.jsx';
import { Router } from 'react-router-dom';
import history from './history';
import App from './components/App';

function main() {
  render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('main')
  );
}

main();

module.hot && module.hot.accept('./components/App', main);
