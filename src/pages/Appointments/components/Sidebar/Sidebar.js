import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';

import AppointmentsBlock from './AppointmentsBlock';
import { typography } from 'theme/mixins';

const ScrollableContainer = styled.div`
  height: calc(100% - 88px);
  overflow: auto;
`;

const Heading = styled.div`
  padding: 20px;
  pointer-events: none;
`;

const Date = styled.div`
  font-size: 13px;
  color: #747d8a;
`;

const DayName = styled.div`
  ${typography(18,23,500)};
  color: #4f5660;
`;

const Wrapper = styled.div`
  width: 300px;
  max-height: 661px;
  border: 1px solid #e7eaed;
  border-radius: 4px;
  background-color: #ffffff;
`;

@inject('appointmentsState')
@observer
class Sidebar extends React.Component {
  static propTypes = {
    appointmentsState: PropTypes.object
  }

  @computed get isDateSelected() {
    const { appointmentsState } = this.props;

    return !!appointmentsState.selectedDate;
  }

  @computed get weeklySlots() {
    const { appointmentsState } = this.props;
    
    return this.isDateSelected ? Array.from(appointmentsState.selectedGroup) : [];
  }

  @computed get dayOfWeek() {
    const { appointmentsState } = this.props;

    return this.isDateSelected && appointmentsState.selectedDate.format('dddd');
  }

  @computed get date() {
    const { appointmentsState } = this.props;
    
    return this.isDateSelected && appointmentsState.selectedDate.format('DD MMMM YYYY');
  }

  render() {

    return (
      <Wrapper>
        <Heading>
          <DayName>
            {this.dayOfWeek}
          </DayName>
          <Date>
            {this.date}
          </Date>
        </Heading>
        <ScrollableContainer>
          {this.isDateSelected && <AppointmentsBlock />}
        </ScrollableContainer>
      </Wrapper>
    );
  }
}

export default Sidebar;
