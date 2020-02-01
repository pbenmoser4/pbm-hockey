import React, { Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history';
// import ChartTest from './ChartTest';
// import ApiTest from './ApiTest';
import AppHeader from './AppHeader';
import TeamList from './TeamList';
import TeamPage from './TeamPage/TeamPage';
import PlayerPage from './PlayerPage/PlayerPage';

const App = props => {
  return (
    <Fragment>
      <Router history={history}>
        <AppHeader />
        <Switch>
          <Route path="/" exact component={TeamList} />
          <Route path="/teams/:id" exact component={TeamPage} />
          <Route path="/players/:id" exact component={PlayerPage} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
