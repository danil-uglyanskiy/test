import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { withTranslation } from 'react-i18next';

import { getSlotStartEndTime } from 'utils/moment';
import { calculateSlotWidth, calculateSlotOffset } from 'pages/Schedules/utils/Schedule';

const DoctorsInfo = styled.span`
  display: flex;
`;

const CountContainer = styled.span`
  background-color: #eaf6f0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 26px;
  width: auto;
  color: #2EA64F;
  height: 26px;
  border-radius: 50%;
  padding: 2px;
`;

const PeriodContainer = styled.div`
  font-size: 10px;
  color: #a1abb8;
  line-height: 12px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 100%;
`;

const TimeContainer = styled.div`
  text-align: right;
  width: 100%;
`;

const DurationContainer = styled.div`
  text-align: right;
  width: 100%;
`;

const DoctorsContainer = styled.span`
  color: #74a790;
  font-size: 18px;
  margin-left: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  border-radius: 4px;
  position: absolute;
  padding: ${props => props.width < 20 ? '0' : '12px'};
  border: 2px solid #eff3f9;
  width: ${props => props.width || 50}px;
  left: ${ props => props.offset || 4}px;
  height: 54px;
  ${({ isWeekend }) => isWeekend && css`
    background-color: #F2F9FF;
  `}
`;

@withTranslation()
@observer
class Slot extends React.Component {
  static propTypes = {
    slot: PropTypes.object,
    day: PropTypes.string,
    isWeekend: PropTypes.bool,
    t: PropTypes.func,
    className: PropTypes.string
  }

  static defaultProps = {
    className: 'slot'
  }

  render() {
    const { slot, day, isWeekend, t, className } = this.props;

    const width = calculateSlotWidth(slot);
    const offset = calculateSlotOffset(slot, day);
    const duration = slot.duration;
    return (
      <Wrapper
        width={width}
        offset={offset}
        isWeekend={isWeekend}
        className={className}
      >
        <DoctorsInfo>
          {width >= 50 && (
            <CountContainer>
              {slot.count}
            </CountContainer>
          )}

          {width > 110 && (
            <DoctorsContainer>
              {t('SchedulesForm.Doctors', { count: slot.count })}
            </DoctorsContainer>
          )}

        </DoctorsInfo>

        {width > 180 && (
          <PeriodContainer>
            <TimeContainer>
              {getSlotStartEndTime(slot.start_date, slot.end_date)}
            </TimeContainer>
            <DurationContainer>
              {t('Schedules.Duration', { duration })}
            </DurationContainer>
          </PeriodContainer>
        )}
      </Wrapper>
    );
  }
}

export default styled(Slot)``;