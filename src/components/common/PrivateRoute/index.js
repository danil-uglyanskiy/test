import React from 'react';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

@withRouter
@inject('authStore')
@observer
class PrivateRoute extends React.Component {
  static propTypes = {
    authStore: PropTypes.object,
    location: ReactRouterPropTypes.location,
  };

  @computed get isAuthenticated() {
    const { authStore } = this.props;
    return authStore.authenticated;
  }

  render() {
    const { location: from } = this.props;

    return this.isAuthenticated
      ? <Route {...this.props} />
      : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from },
          }}
        />
      );
  }
}

export default PrivateRoute;
