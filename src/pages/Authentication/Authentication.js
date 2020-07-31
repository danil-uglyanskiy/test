import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import { Redirect } from 'react-router-dom';
import Login from './Login';

@inject('authStore')
@observer
class Auth extends React.Component {
  static propTypes = {
    authStore: PropTypes.any,
  };

  @computed get isAuthenticated() {
    const { authStore } = this.props;
    return authStore.authenticated;
  }

  render() {
    return this.isAuthenticated
      ? <Redirect to="/" />
      : <Login />;
  }
}

export default Auth;
