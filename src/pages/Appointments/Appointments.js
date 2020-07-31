import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { List } from './containers';

class Consultations extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          path='/appointments'
          component={List}
        />
      </Switch>
    );
  }
}

export default Consultations;
