import React from 'react';
import {renderToString} from 'react-dom/server';
import express from 'express';
import fs from 'fs';
import Store from './stores/index';
import Routes from './routes';
import Db from './helpers/db';

//CREATE DATABASE IF NOT EXISTS editthis;
const DataBase = Db.initialize();

const ApiRoutes = Routes.filter(route => {
  return route.isApi;
});

// get autobind ;)
// Get request data working
// get image caching working

const app = express();
app.set('views', __dirname + '/pages');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// Pull our react bundle from disk and cache it
const bundle = fs.readFileSync('build/bundle.js', 'utf8');
const payload = (props) => {
  return (`
<!DOCTYPE html>
<html>
  <head>
    <script id="props" type="text/javascript">
      window.__APP_INITIAL_STATE__ = ${JSON.stringify(props)};
    </script>
    <script type="text/javascript">
      ${bundle}
    </script>
  </head>
  <body>
    <div id="root"/>
  </body>
</html>
`);
};

const rerender = (req, res) => {
  return () => {
    console.log(`re-rendering '${req.url}'`);
    //res.write(payload(Store.getState()));
  }
};

// Our main render function, serves our whole webpacked react payload to the user
const render = (req, res) => {
  // Special case for /favicon.ico, to stop repeatedly rerendering our package
  // Can be removed by simply sending an icon
  
  if (req) {
    // If it's not just a rerender
    if (req.url === '/favicon.ico') {
      res.send('');
      return;
    }
    console.log(`rendering '${req.url}'`);
    res.set('Content-Type', 'text/html');
    //res.set('Connection', 'keep-alive');
    res.send(payload(Store.getState()));
    Store.subscribe(rerender(req, res));
  }
};

ApiRoutes.forEach(route => {
  console.log(`Adding ${route.path} to the api`);
  app.use(
    route.path,
    route.handler.bind(null, {
      db: DataBase
    })
  );
});

app.get('/*', render);
app.listen(3000);
