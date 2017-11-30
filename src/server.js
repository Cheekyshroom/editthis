import React from 'react';
import {renderToString} from 'react-dom/server';
import express from 'express';
import fs from 'fs';
import Store from './stores/index';
import Routes from './routes';
import Db from './helpers/db';
import BodyParser from 'body-parser';

const DataBase = Db.initialize();

const context = {
  db: DataBase
};

const ApiRoutes = Routes.filter(route => {
  return route.isApi;
});

// get image caching working
const app = express();
app.use(BodyParser.json({limit: '50mb'}));
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

// Our main render function, serves our whole webpacked react payload to the user
const render = (req, res) => {
  // If it's not just a rerender
  if (req) {
    // Special case for /favicon.ico, to stop repeatedly rerendering our package
    if (req.url === '/favicon.ico') {
      res.send('');
      return;
    }
    console.log(`rendering '${req.url}'`);
    res.set('Content-Type', 'text/html');
    res.send(payload({
      params: req.params || {},
      query: req.query || {},
      body: req.body || {}
    }));
  }
};

ApiRoutes.forEach(route => {
  console.log(`Adding ${route.path} to the api`);
  app.use(
    route.path,
    route.handler.bind(null, context)
  );
});

app.get('/*', render);
app.listen(3000);
