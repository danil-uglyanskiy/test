import React from "react";
import styled, { css } from "styled-components";
import moment from "moment";
import PropTypes from 'prop-types';
import { inject, Provider, observer } from "mobx-react";
import { computed, observable } from "mobx";

import Slot from './Slot';
import HoverPlus from "./HoverPlus";
import DailySlotsState from './state/DailySlotsState';
import { Close } from "icons";
import { sizes, roundOffsetToSlot } from 'pages/Schedules/utils/Schedule';
import { StartBorder, EndBorder } from './Borders';

const RemoveRangeControl = styled(Close)`
  width: 22px;
  height: 22px;
  background-color: #e95e5e;
  cursor: pointer;
  color: #fff;
  border-radius: 100%;
  position: absolute;
  display: none;
  right: 0;
  top: 0;
  transform: translate(50%, -50%);
`;

const Container = styled.div`
  position: relative;
  display: flex;
  z-index:1;
  height: 54px;
  width: ${sizes.containerWidth}px;
  left: 84px;
  align-self: flex-start;
  ${({isMoving}) => isMoving && css`
    cursor: move;
  `};
  ${Slot}{
    cursor: move;
    &:hover{
      z-index:2;
      ${RemoveRangeControl}{
        display: block;
      }
    }
  }
  &:not(:hover) {
      ${HoverPlus} {
        display: none;
    }
  }
`;

function calculateTimeByOffset(offset) {
  const minutes = Math.round(offset / sizes.minuteWidth);

  return moment()
    .hour(0)
    .minute(minutes)
    .format("HH:mm");
}

@inject('editScheduleState')
@observer
class DailySlots extends React.Component {
  static propTypes = {
    editScheduleState: PropTypes.object,
    day: PropTypes.string
  }

  constructor(props) {
    super(props);

    const { editScheduleState, day } = props;

    this.dailySlotsState = new DailySlotsState(editScheduleState, day);

    document.addEventListener("mouseup", e => this.handleMouseUp(e));

  }

  componentDidMount() {
    this.dailySlotsState.initReaction();
  }

  componentWillUnmount() {
    this.dailySlotsState.dispose();
  }

  @observable min;
  @observable max;
  @observable currentPosition = 0;
  @observable editEndPosition = -1;
  @observable editStartPosition = -1;
  @observable editSlot = -1;
  @observable offsetElement;
  @observable startMovingPosition = 0;
  @observable endPositionBeforeMoving = 0;
  @observable startPositionBeforeMoving = 0;

  @computed get slots() {
    return this.dailySlotsState.slots.toJSON();
  }

  @computed get isMoving() {
    return this.editSlot !== -1 || this.editEndPosition !== -1 || this.editStartPosition !== -1;
  }

  handleSelectionStart = e => {
    const index = this.dailySlotsState.addSlot(e.nativeEvent.pageX - this.offsetElement);
    this.initMoveEndPosition(index);
  };

  initMoveEndPosition = rangeIndex => {
    this.editEndPosition = rangeIndex;

    if (rangeIndex+2 <= this.slots.length) {
      this.max = this.slots[rangeIndex + 1].start_pos;
    }

    this.min = this.slots[rangeIndex].start_pos + 1;
  };

  initMoveStartPosition = rangeIndex => {
    this.editStartPosition = rangeIndex;

    if (rangeIndex - 1 >= 0) {
      this.min = this.slots[rangeIndex - 1].end_pos;
    }
    
    this.max = this.slots[rangeIndex].end_pos - 1;
  };

  handleMouseMove = (e) => {
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    this.offsetElement = rect.x;
    const layerX = roundOffsetToSlot(e.clientX - this.offsetElement);

    if (this.editEndPosition === -1 && this.editStartPosition === -1 && layerX >= 0 && this.editSlot === -1 && layerX + sizes.slotDurationWidth <= sizes.containerWidth) {
      this.currentPosition = layerX;
    }

    if (
      (this.editEndPosition === -1 && this.editStartPosition === -1 && this.editSlot === -1) ||
      e.movementX === 0 ||
      (this.max && layerX > this.max) ||
      (this.min && layerX < this.min)
    ) {
      return false;
    }

    if (this.editStartPosition > -1) {
      this.updateStartPosition(layerX);
    } else if (this.editEndPosition > -1) {
      this.updateEndPosition(layerX);
    } else if (this.editSlot > -1) {
      this.updateSlotPosition(e.pageX);
    }
  };

  updateSlotPosition = position => {
    let slots = this.slots;
    let min = 0;
    let max = sizes.containerWidth;
    const width = slots[this.editSlot].end_pos - slots[this.editSlot].start_pos;
    let delta = roundOffsetToSlot(position - this.startMovingPosition);
    let endPos = this.endPositionBeforeMoving + delta;
    let startPos = this.startPositionBeforeMoving + delta;
    if (this.editSlot - 1 >= 0) {
      min = this.slots[this.editSlot - 1].end_pos;
    }

    if (this.editSlot+2 <= this.slots.length) {
      max = this.slots[this.editSlot + 1].start_pos;
    }

    if (endPos > max) {
      endPos = max;
      startPos = max - width;
    }

    if (startPos < min) {
      startPos = min;
      endPos = min + width;
    }

    slots[this.editSlot].end_pos = endPos;
    slots[this.editSlot].start_pos = startPos;
    this.dailySlotsState.updateSlots(slots);

  };

  updateEndPosition = position => {
    let slots = this.slots;
    const durationWidth = slots[this.editEndPosition].duration * sizes.minuteWidth;
    const end_pos = slots[this.editEndPosition].end_pos;

    if (Math.abs(position - end_pos) % durationWidth <= 3) {
      slots[this.editEndPosition].end_pos = position;
      this.dailySlotsState.updateSlots(slots);
    }
  };

  updateStartPosition = position => {
    let slots = this.slots;
    const durationWidth = slots[this.editStartPosition].duration * sizes.minuteWidth;
    const start_pos = slots[this.editStartPosition].start_pos;

    if (Math.abs(position - start_pos) % durationWidth <= 3) {
      slots[this.editStartPosition].start_pos = position;
      this.dailySlotsState.updateSlots(slots);
    }
  };

  handleMouseUp = e => {
    this.editStartPosition = -1;
    this.editEndPosition = -1;
    this.editSlot = -1;
    this.max = null;
    this.min = null;
    this.startMovingPosition = 0;
    this.startPositionBeforeMoving = 0;
    this.endPositionBeforeMoving = 0;
  };

  handleStopPropagation = e => e.stopPropagation();

  handleRemoveRange = (e, rangeIndex) => {
    this.dailySlotsState.removeSlot(rangeIndex);
    e.stopPropagation();
  };

  handleSlotMouseDown = (e, index) => {
    this.editSlot = index;
    this.startMovingPosition = e.nativeEvent.pageX;
    this.startPositionBeforeMoving = this.slots[index].start_pos;
    this.endPositionBeforeMoving = this.slots[index].end_pos;
  }

  handleCursorOnSlot = e => {
    const isMousePressed = e.buttons === 1;

    if (!isMousePressed) {
      e.stopPropagation();
    }
  }

  render() {

    const slots = this.slots.map((slot, i) => (
      <Slot
        slot={slot}
        key={i}
        index={i}
        onMouseDown={e => this.handleSlotMouseDown(e, i)}
        onMouseMove={this.handleCursorOnSlot}
      >
        <StartBorder
          onMouseDown={() => this.initMoveStartPosition(i)}
        />
        <EndBorder
          onMouseDown={() => this.initMoveEndPosition(i)}
        />
        <RemoveRangeControl onClick={(e) => this.handleRemoveRange(e, i)} />
      </Slot>
    ));

    return (
      <Provider dailySlotsState={this.dailySlotsState}>
        <Container
          isMoving={this.isMoving}
          onMouseMove={this.handleMouseMove}
        >
          <HoverPlus
            width={sizes.slotDurationWidth}
            offset={this.currentPosition - 3}
            title={calculateTimeByOffset(this.currentPosition)}
            onMouseDown={this.handleSelectionStart}
          />
          {slots}
        </Container>
      </Provider>
    );
  }
}

export default styled(DailySlots)``;
