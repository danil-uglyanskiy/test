import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { List } from './containers';

class Doctors extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route
          path="/doctors"
          component={List}
        />
      </Switch>
    );
  }
}

export default Doctors;
