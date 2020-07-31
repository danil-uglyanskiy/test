import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Slot from './Slot';
import EmptySlot from './EmptySlot';

const SlotsTrack = styled.div`
  position: relative;
  width: 1296px;
  height: 54px;

  &:not(:last-child) {
    margin-bottom: 2px;
  }
`;

const SlotTracksColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 1296px;
  position: relative;
  left: 84px;
  height: 100%;
`;

@observer
class SlotsContainer extends React.Component {
  static propTypes = {
    rows: PropTypes.array,
    day: PropTypes.string,
    isWeekend: PropTypes.bool
  }

  renderSlot = (slot, index) => {
    const { day, isWeekend } = this.props;

    return slot.count ? (
      <Slot
        slot={slot}
        day={day}
        key={index}
        isWeekend={isWeekend}
      />
    ) : (
      <EmptySlot
        slot={slot}
        day={day}
        key={index}
        isWeekend={isWeekend}
      />
    );
  }
  render() {
    const { rows } = this.props;

    const slots = rows.map((row, i) => (
      <SlotsTrack key={i}>
        {row.map((item, i) => (
          this.renderSlot(item, i)
        ))}
      </SlotsTrack>
    ));

    return (
      <SlotTracksColumn>
        {slots}
      </SlotTracksColumn>
    );
  }
}

export default styled(SlotsContainer)``;