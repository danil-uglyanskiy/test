import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { List } from './containers';

class Schedules extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route
          path="/schedules"
          component={List}
        />
      </Switch>
    );
  }
}

export default Schedules;
