import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { getDaysInWeekRange, getWeekends } from 'utils/moment';

import DayTrack from '../DayTrack';

const Weekends = styled.div`
  position: relative;
  left: 0;
  background-color: #d3e8ff;
  width: 100%;
  opacity: .5;
  height: auto;
  z-index: 9;

  & + .weekend {
    .weekends-container {
      padding: 0 0 8px 0;
    }
  }

  .day-track {
    margin-bottom: 0;
  }

  .slot {
    border: 2px solid #d3e8ff !important;
  }
`;

const WeekendsContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding: 8px 0;
`;

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

@observer
class WeekBlock extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    week: PropTypes.object
  }
  
  renderWeek = () => {
    const { data, week } = this.props;
    const days = data.map(item => item);
    const daysInWeek = getDaysInWeekRange(week, days);

    return daysInWeek.map((item, i) => (
      <React.Fragment key={i}>
        {getWeekends(item.day) ?
          (
            <Weekends className='weekend' key={i}>
              <WeekendsContainer className='weekends-container'>
                <DayTrack
                  day={item.day}
                  slots={item.slots}
                  isWeekend={getWeekends(item.day)}
                />
              </WeekendsContainer>
            </Weekends>
          )
          :
          (
            <DayTrack
              day={item.day}
              slots={item.slots}
              isWeekend={getWeekends(item.day)}
            />
          )}
      </React.Fragment>
    ));
  }

  render() {
    return (
      <Wrapper>{this.renderWeek()}</Wrapper>
    );
  }
}

export default styled(WeekBlock)``;
