import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Header from './components/header';
import Routes from './routes';

const UsableRoutes = Routes.filter(route => {
  return !route.isApi;
});

class App extends React.Component {
  render() {
    return (
      <div style = {{position: 'absolute', top:0, right:0, bottom:0, left:0, margin:0, padding:0, height: '100vh'}}>
        <Header/>
        <Switch>
          {UsableRoutes.map((route, i) => {
            return (
              <Route
                exact={route.exact}
                path={route.path}
                component={route.component}
                key={`route-${i}`}
              />
            );
          })}
        </Switch>
      </div>
    );
  }
}

export default App;
