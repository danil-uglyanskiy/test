import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { Route, Switch } from 'react-router-dom';

import Appointment from './Appointment';
import AppointmentsTable from './AppointmentsTable';

const Wrapper = styled.div``;

@observer
class Appointments extends React.Component {

    render() {

        return (
          <Wrapper>
            <Switch>
              <Route
                exact
                path='/patients/:id/:type?'
                component={AppointmentsTable}
              />
              <Route
                exact
                path='/patients/:id/appointments/:appointmentId'
                component={Appointment}
              />
            </Switch>
          </Wrapper>
        );
    }
}

export default Appointments;
