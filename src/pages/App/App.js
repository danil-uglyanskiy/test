import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import styled from "styled-components";
import { computed } from "mobx";
import { inject, observer } from "mobx-react";

import Authentication from "pages/Authentication";
import { Doctors, Schedules, Appointments, Patients } from "pages";
import PrivateRoute from "components/common/PrivateRoute";

import GlobalStyle from "./GlobalStyle";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-grow: 1;
  background-color: #EFF3F9;

  & > * {
    flex-grow: 1;
  }
`;

@inject("authStore")
@observer
class App extends React.Component {
  static propTypes = {
    authStore: PropTypes.any
  };

  @computed get isAuthenticated() {
    const { authStore } = this.props;
    return authStore.authenticated;
  }

  render() {
    return (
      <Wrapper>

        <Content>
          <GlobalStyle />

          <Switch>
            <Redirect exact from="/" to="/doctors" />
            <PrivateRoute path="/appointments" component={Appointments} />
            <PrivateRoute path="/doctors" component={Doctors} />
            <PrivateRoute path="/schedules" component={Schedules} />
            <PrivateRoute path="/patients" component={Patients} />
            <Route path="/login" component={Authentication} />
          </Switch>

        </Content>

      </Wrapper>
    );
  }
}

export default App;
