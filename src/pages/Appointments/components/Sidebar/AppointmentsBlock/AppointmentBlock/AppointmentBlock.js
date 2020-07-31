import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { observer, inject } from 'mobx-react';

import Appointment from './Appointment';
import { display } from 'theme/mixins';

const TimeContainer = styled.div`
  font-size: 10px;
  color: #747d8a;
`;

const AppointmentConteiner = styled.div``;

const Wrapper = styled.div`
  position: relative;
  padding: 0 20px;
  ${display('flex', 'flex-start', 'space-between')};
  flex-wrap:wrap;
  &:not(:last-child) {
    margin-bottom: 32px;
  }
`;

@inject('appointmentsState')
@observer
class AppointmentBlock extends React.Component {
  static propTypes = {
    dailySlot: PropTypes.object
  }

  @computed get appointments() {
    const { dailySlot } = this.props;

    return dailySlot[1];
  }

  @computed get time() {
    const { dailySlot } = this.props;

    return dailySlot[0];
  }

  render() {

    const listItems = this.appointments.map(appointment => <Appointment key={appointment.id} appointment={appointment} />);
    
    return (
      <Wrapper>
        <TimeContainer>
          {this.time}
        </TimeContainer>
        <AppointmentConteiner>
          {listItems}
        </AppointmentConteiner>
      </Wrapper>
    );
  }
}

export default AppointmentBlock;
