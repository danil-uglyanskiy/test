import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import AppointmentsInfo from './AppointmentsInfo';

const WeekDay = styled.span`
  position: absolute;
  top: 11px;
  left: 13px;
  font-size: 10px;
  color: #747d8a;
  pointer-events: none;
`;

const Wrapper = styled.div`
  border-collapse: collapse;
  position:relative;
  display:flex;
  align-items: flex-end;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: 10px;
  background: transparent;
  box-shadow:0 0 0 1px #cdd3da;
  ${({ row, column }) => css`
      grid-column: ${column};
      grid-row: ${row};
  `};
  ${({ active }) => active && css`
      background: #D3E8FF;
      box-shadow:0 0 0 1px #ABD3FF;
  `};
`;

@inject('appointmentsState')
@observer
class DayCell extends React.Component {
  static propTypes = {
    day: PropTypes.number,
    appointmentsState: PropTypes.object,
    active: PropTypes.bool,
    offset: PropTypes.number,
    selected: PropTypes.bool
  }

  @computed get hasAppointments() {
    const { day, appointmentsState } = this.props;

    return appointmentsState.getSlotsByDay(day + 1) > 0;
  }

  render() {
    const { day, active, offset, selected } = this.props;
    const column = ((day + offset) % 7) + 1;
    const row = Math.floor((day + offset) / 7) + 1;

    return (
      <Wrapper column={column} row={row} active={active} selected={selected}>
        <WeekDay>{day + 1}</WeekDay>
        {this.hasAppointments && (
          <AppointmentsInfo
            day={day}
            active={active}
            selected={selected}
          />
        )}
      </Wrapper>
    );
  }
}

export default DayCell;