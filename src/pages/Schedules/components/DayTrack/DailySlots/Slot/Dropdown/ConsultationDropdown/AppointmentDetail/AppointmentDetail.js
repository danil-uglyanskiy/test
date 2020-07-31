import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import { withTranslation } from 'react-i18next';

import moment, { getHoursAndMinutes } from 'utils/moment';

const DateContainer = styled.div`
  color: #4F5660;	
  font-size: 14px;	
  line-height: 24px;
`;

const MoreContainer = styled.div`
  color: #1A7CE8;	
  font-size: 14px;	
  line-height: 24px;
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

@withTranslation()
@observer
class AppointmentDetail extends React.Component {
  static propTypes = {
    t: PropTypes.func,
    appointment: PropTypes.object
  }

  @computed get startDate() {
    const { appointment } = this.props;

    return moment(appointment.start_date).format('DD MMM');
  }

  @computed get startTime() {
    const { appointment } = this.props;

    return getHoursAndMinutes(appointment.start_date);
  }

  @computed get endTime() {
    const { appointment } = this.props;

    return getHoursAndMinutes(appointment.end_date);
  }

  render() {
    const { appointment, t, ...rest } = this.props;
    return (
      <Wrapper {...rest}>
        <DateContainer>
          {t('SchedulesForm.Consultations.Time',
            {
              date: this.startDate,
              startTime: this.startTime,
              endTime: this.endTime
            })}
        </DateContainer>
        <MoreContainer>
          {t('UI.More')}
        </MoreContainer>
      </Wrapper>
    );
  }
}

export default styled(AppointmentDetail)``;
