import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { List, Show } from './containers';

class Patients extends React.PureComponent {
  
  render() {
    return (
      <Switch>
        <Route
          exact
          path='/patients'
          component={List}
        />
        <Route
          exact
          path='/patients/:id'
          component={Show}
          key={1}
        />
        <Route
          exact
          path='/patients/:id/:type'
          component={Show}
          key={2}
        />
        <Route
          exact
          path='/patients/:id/:type/:appointmentId'
          component={Show}
          key={3}
        />
      </Switch>
    );
  }
}

export default Patients;
