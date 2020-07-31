import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer, Provider } from 'mobx-react';
import styled from 'styled-components';
import LoginForm, { fields } from 'forms/Authentication/LoginForm';
import Promo from './Promo';
import Content from './Content';

const PromoS = styled(Promo)``;

const ContentS = styled(Content)``;

const LoginS = styled.div`
  display: flex;

  ${PromoS} {
    flex-grow: 1;
  }

  ${ContentS} {
    flex-grow: 0;
    width: 754px;
  }
`;

@inject('authStore')
@observer
class Login extends React.Component {
  static propTypes = {
    authStore: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.form = new LoginForm(fields, {
      hooks: {
        onSuccess: this.handleSuccess,
        onError: this.handleError,
      },
    });
  }

  handleSuccess = (form) => {
    const { authStore } = this.props;

    authStore.login({ email: form.$('email').value.toLowerCase(), password: form.$('password').value });
  }

  handleError = (form) => {

  }

  render() {
    return (
      <Provider form={this.form}>
        <LoginS>
          <PromoS />
          <ContentS />
        </LoginS>
      </Provider>
    );
  }
}

export default Login;
