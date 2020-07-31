import React, { Component } from 'react';
import { computed } from 'mobx';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';

import DayTrack from '../DayTrack';

import { getMonthWeeks } from '../../utils/sort';

const ScrollableContainer = styled.div`
  width: 1376px;
`;

const Wrapper = styled.div`
  user-select: none;
`;

@inject('schedulesState')
@observer
class ScheduleTable extends Component {
  static propTypes = {
    schedulesState: PropTypes.object
  }

  @computed get isFetched() {
    const { schedulesState } = this.props;

    return !!schedulesState.slots;
  }

  @computed get schedulesList() {
    const { schedulesState } = this.props;

    return this.isFetched && schedulesState.slots;
  }

  @computed get days() {
    return this.isFetched ?
      getMonthWeeks(this.schedulesList)
      : [];
  }

  render() {
    const table = this.days.map((item) =>
      <DayTrack
        key={item.day}
        day={item.day}
        slots={item.slots}
        isWeekend={item.isWeekend}
      />
    );

    return (
      <Wrapper>
        <ScrollableContainer>
          {table}
        </ScrollableContainer>
      </Wrapper>
    );
  }
}

export default styled(ScheduleTable)``;