import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import { computed } from 'mobx';

import AppointmentState from './state/AppointmentState';
import Appointment from './Appointment';
import Loader from 'components/common/Loader';

const EmptyAppointmentsContainer = styled.div`
  height: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoaderContainer = styled(EmptyAppointmentsContainer)`
  position: relative;
`;

const Wrapper = styled.div`
  width:100%;
  position: relative;
  min-height:200px;
`;

@inject('patientState')
@withTranslation()
@observer
class Deseases extends React.Component {
  
  static propTypes = {
    t: PropTypes.func,
    patientState: PropTypes.object
  }

  constructor(props) {
    super(props);
    
    const { patientState } = props;
    this.appointmentState = new AppointmentState(patientState.id);
  }

  componentDidMount() {
    this.appointmentState.fetchAppointments();
  }

  componentWillUnmount() {
    this.appointmentState.dispose();
  }

  @computed get isFetched() {
      return this.appointmentState.isFetched;
  }

  @computed get appointments() {
      return this.appointmentState.appointments;
  }

  render() {
    const { t, ...rest } = this.props;
    let appointments = (
      <EmptyAppointmentsContainer>
        {t('Appointments.Empty')}
      </EmptyAppointmentsContainer>
    );

    if (this.appointments.length > 0) {
      appointments = this.appointments.map(appointment => <Appointment key={appointment.id} appointment={appointment} />);
    }

    if (!this.isFetched) {
      return (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      );
    }

    return (
      <Wrapper {...rest}>
        {appointments}
      </Wrapper>
    );
  }
}

export default Deseases;