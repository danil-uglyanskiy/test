import React from 'react';
import { computed } from 'mobx';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import PatientAppointmentsState from './state/PatientAppointmentsState';

import AppointmentsList from './AppointmentsList';
import AppointmentItem from './AppointmentItem';
import Loader from 'components/common/Loader';

const Wrapper = styled.div``;

@withRouter
@observer
class AppointmentsTable extends React.Component {
    static propTypes = {
        match: PropTypes.object
    };

    constructor(props) {
        super(props);

        const { match } = this.props;
        const { params } = match;

        this.appointmentsState = new PatientAppointmentsState(params.id);
    }

    componentDidMount() {
        this.appointmentsState.fetchAppointments();
    }

    @computed get appointments() {
        return this.appointmentsState.appointments;
    }

    @computed get isFetched() {
        return this.appointmentsState.isFetched;
    }

    render() {

        const appointments = this.appointments.map((appointment, i) => (
          <AppointmentItem key={i} appointment={appointment} />
        ));

        return (
          <Wrapper>
            <AppointmentsList>
              {this.isFetched ? appointments : []}
            </AppointmentsList>
            {!this.isFetched && <Loader />}
          </Wrapper>
        );
    }
}

export default AppointmentsTable;
