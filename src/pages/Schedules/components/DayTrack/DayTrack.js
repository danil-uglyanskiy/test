import React from 'react';
import PropTypes from 'prop-types';
import { observer, Provider } from 'mobx-react';

import styled, { css } from 'styled-components';
import { withRouter } from 'react-router-dom';

import SlotsContainer from '../SlotsContainer';
import DailySlots from './DailySlots';
import { computed } from 'mobx';
import DayTrackState from './state/DayTrackState';

const DayNumber = styled.span`
  display: inline-block;
  margin-right: 12px;
  font-size: 18px;
  font-weight: 500;
  color: #4f5660;
`;

const DayName = styled.span`
  font-size: 10px;
  font-weight: 500;
  color: #4f5660;
  text-transform: uppercase;
`;

const WeekDay = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  border-radius: 4px;
  width: 80px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  margin-bottom: 6px;
  min-height: ${props => 56 * (props.rowsNum || 1)}px;

  &:hover{
    z-index:5;
  }

  ${({isWeekend}) => isWeekend && css`
    position: relative;
    left: 0;
    background-color: rgba(209, 231, 255, .5);
    width: 100%;
    height: auto;
    ${WeekDay} {
      background-color: #F4F9FF;
    }
  `}

  ${({ opened }) => opened && css`
    z-index:22;
  `}

  ${({ rowsNum, isEditPage }) => isEditPage && (rowsNum > 1) && css`
    &:before{
      position: absolute;
      content: '';
      top: 56px;
      width:100%;
      height: ${56 * (rowsNum - 1)}px;
      cursor: not-allowed;
    }
  `}
`;

@withRouter
@observer
class DayTrack extends React.Component {
  static propTypes = {
    day: PropTypes.string.isRequired,
    slots: PropTypes.array.isRequired,
    isWeekend: PropTypes.bool,
    location: PropTypes.object,
    match: PropTypes.object,
    className: PropTypes.string
  };

  static defaultProps = {
    day: '',
    slots: [],
    className: ''
  }

  constructor(props) {
    super(props);

    const { slots, day } = props;

    this.dayTrackState = new DayTrackState({ slots, day });
  }

  @computed get slots() {
    return this.dayTrackState.slots;
  }

  @computed get rowsNum() {
    return this.slots.length;
  }

  @computed get isEditPage() {
    const { location, match } = this.props;
    const { params } = match;
    const { doctor_id } = params;
    const path = location.pathname;

    return path === `/schedules/${doctor_id}/edit`;
  }

  render() {
    const { day, isWeekend, className, match: { params: { doctor_id } } } = this.props;
    
    return (
      <Provider dayTrackState={this.dayTrackState}>
        <Wrapper
          opened={this.dayTrackState.opened}
          className={className}
          rowsNum={this.rowsNum}
          isEditPage={this.isEditPage}
          isWeekend={isWeekend}
        >
          <WeekDay>
            <DayNumber>{this.dayTrackState.dayOfMonth}</DayNumber>
            <DayName>{this.dayTrackState.dayName}</DayName>
          </WeekDay>
          {!this.isEditPage && (
            <SlotsContainer
              rows={this.slots}
              day={day}
              isWeekend={isWeekend}
            />
          )}
          {doctor_id && <DailySlots day={day} />}
        </Wrapper>
      </Provider>
    );
  }
}

export default styled(DayTrack)``;
