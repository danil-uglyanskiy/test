import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withTranslation } from 'react-i18next';

import AppointmentDetail from './AppointmentDetail';

const TimeContainer = styled.div``;

const MainContainer = styled.div`
  background:white;
  padding: 20px 15px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
`;

const Wrapper = styled.div`
  :before{
    content: '';
    position:absolute;
    top: -14px;
    left: 140px;
    width:10px;
    border: 10px solid transparent; border-bottom: 7px solid white;
    z-index: 10;
  }
`;

@withTranslation()
@inject('slotState')
@observer
class ConsultationDropdown extends React.Component {
  static propTypes = {
    slotState: PropTypes.object,
    t: PropTypes.func
  }

  render() {
    const { slotState, t, ...rest } = this.props;

    const busyAppointments = slotState.busyAppointments.map(appointment => <AppointmentDetail key={appointment.id} appointment={appointment} />);

    return (
      <Wrapper {...rest}>
        <MainContainer>
          <TimeContainer>
            {busyAppointments}
          </TimeContainer>
        </MainContainer>
      </Wrapper>
    );
  }
}

export default styled(ConsultationDropdown)``;
