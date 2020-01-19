import * as React from 'react';
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import Spinner from './components/Spinner';
import Home from './pages/home';
import Error from './pages/error';

class App extends React.Component {
  public render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/error">
            <React.Suspense fallback={<Spinner />}>
              <Error />
            </React.Suspense>
          </Route>
          <Route path="/home">
            <Home />
          </Route>

          <Route exact={true} path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="*">
            <React.Suspense fallback={<Spinner />}>
              <Error />
            </React.Suspense>
          </Route>
        </Switch>
      </HashRouter>

    )
  }
}

export default App;