import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import App from './app';
import Store from './stores/index';

// Just a wrapper component to allow use of react router, we could honestly
// put all of this into app.js
window.onload = () => {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={Store}>
        <App {...window.__APP_INITIAL_STATE__}/>
      </Provider>
    </BrowserRouter>,
    document.getElementById('root')
  );
};
