import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { computed } from 'mobx';

import moment, { datesEqual } from 'utils/moment';

import DayCell from './DayCell';
import Loader from 'components/common/Loader';
import TableHeading from './TableHeading';

const TableBody = styled.div`
  position:relative;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 100px;
  justify-self: center;
  width: 715px;
  min-height: 500px;
  height: min-content;;
  border: 1px solid #cdd3da;
  box-sizing: border-box;
  grid-gap:1px;
  border-radius: 4px;
  background-color: #eceff2;
  margin-top:8px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

@inject('appointmentsState')
@observer
class Table extends React.Component {
  static propTypes = {
    appointmentsState: PropTypes.object
  }

  @computed get date() {
    const { appointmentsState } = this.props;
    return appointmentsState.date;
  }

  @computed get selectedDate() {
    const { appointmentsState } = this.props;
    return appointmentsState.selectedDate;
  }

  @computed get days() {
    return this.date ? Array.from({ length: this.date.daysInMonth() }, (_, index) => index) : [];
  }

  @computed get offset() {
    const monthStart = moment(this.date).startOf('month');
    return monthStart.isoWeekday() - 1;
  }

  isActive = (day) => {
    const differenceInDays = moment().diff(this.date.date(day), 'days');
    return differenceInDays <= 0;
  }

  isSelected = (day) => {
    return this.selectedDate && datesEqual(this.date.date(day), this.selectedDate);
  }

  render() {
    const { isPending } = this.props.appointmentsState;

    const listItems = this.days.map((day) =>
      (
        <DayCell
          key={day}
          day={day}
          offset={this.offset}
          active={this.isActive(day + 1)}
          selected={this.isSelected(day + 1)}
        />
      )
    );
    return (
      <Wrapper>
        <TableHeading />
        <TableBody>
          {listItems}
          {isPending && <Loader />}
        </TableBody>
      </Wrapper>
    );
  }
}

export default styled(Table)``;
