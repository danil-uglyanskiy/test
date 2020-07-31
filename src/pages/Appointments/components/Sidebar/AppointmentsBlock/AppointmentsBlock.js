import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { observer, inject } from 'mobx-react';

import AppointmentBlock from './AppointmentBlock';

const Wrapper = styled.div`
  width: 100%;
`;

@inject('appointmentsState')
@observer
class AppointmentsBlock extends React.Component {
  static propTypes = {
    appointmentsState: PropTypes.object
  }

  @computed get dailySlots() {
    const { appointmentsState } = this.props;

    return Array.from(appointmentsState.dailySlots);
  }

  render() {
    const listItems = this.dailySlots.map((dailySlot, index) => <AppointmentBlock key={index} dailySlot={dailySlot} />);
    
    return (
      <Wrapper>
        {listItems}
      </Wrapper>
    );
  }
}

export default AppointmentsBlock;
