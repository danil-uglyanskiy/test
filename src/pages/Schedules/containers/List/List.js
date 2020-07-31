import PropTypes from 'prop-types';
import React from "react";
import { observer, Provider } from "mobx-react";
import { withRouter, Route, Switch } from "react-router-dom";

import { DefaultLayout as Layout } from "components/layouts";
import { Navbar } from "components/ui";
import { PageHeader, SchedulesTable, TimeLine } from "../../components";
import Edit from "../Edit";

import SchedulesState from './state/SchedulesState';

@withRouter
@observer
class List extends React.Component {
  static propTypes = {
    location: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.schedulesState = new SchedulesState();
  }

  componentDidMount() {
    this.schedulesState.initReaction();
  }

  componentWillUnmount() {
    this.schedulesState.dispose();
  }

  render() {
    const { location } = this.props;

    return (
      <Provider
        schedulesState={this.schedulesState}
        schedulesForm={this.schedulesState.schedulesForm}
      >
        <Layout position='absolute'>
          <Layout.Nav>
            <Navbar />
          </Layout.Nav>
          <Layout.Header width="1376px">
            <PageHeader
              heading="Расписание"
                // TODO: const
              isVisible={location.pathname === "/schedules"}
            />
          </Layout.Header>
          <Layout.Body width="1376px">
            <TimeLine
                // TODO: const
              isVisible={location.pathname === "/schedules"}
            />
            <SchedulesTable />
          </Layout.Body>
          <Switch>
            <Route
              exact
              path="/schedules/:doctor_id/edit"
              component={Edit}
            />
          </Switch>
        </Layout>
      </Provider>
    );
  }
}

export default List;
