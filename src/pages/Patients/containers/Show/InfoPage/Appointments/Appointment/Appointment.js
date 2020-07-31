import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import { computed } from 'mobx';
import { withRouter } from 'react-router-dom';

import moment from 'utils/moment';

import Doctor from './Doctor';

const DateContainer = styled.div`
  grid-column: 1;
`;

const DetailContainer = styled.div`
  grid-column: 2;
`;

const Date = styled.div`
	color: #4F5660;
	font-size: 14px;
	line-height: 16px;
`;

const Specialization = styled.div`
	color: #4F5660;
	font-size: 14px;
	line-height: 16px;
`;

const DatePlaceholder = styled.div`
	color: #747D8A;
	font-size: 13px;
	line-height: 15px;
`;

const DoctorsContainer = styled.div`
  grid-column: 3;
`;

const AppointmentType = styled.div`
	color: #747D8A;
	font-size: 13px;
	line-height: 15px;
`;

const Wrapper = styled.div`
    width:100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 26px;
    padding: 17px 5px;
    border-bottom: 1px solid #E7EAED;
    cursor: pointer;
`;

@withRouter
@withTranslation()
@inject('patientState')
@observer
class Appointment extends React.Component {
  
  static propTypes = {
    t: PropTypes.func,
    appointment: PropTypes.object,
    history: PropTypes.object,
    patientState: PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  @computed get appointment() {
      const { appointment } = this.props;

      return appointment;
  }

  @computed get doctors() {
    return this.appointment.doctors;
  }

  @computed get startDate() {
    return moment(this.appointment.start_date).format('DD MMMM YYYY');
  }

  handleClick = () => {
    const { history, appointment, patientState } = this.props;

    history.push(`/patients/${patientState.id}/appointments/${appointment.id}`);
  }

  render() {
    const { t, ...rest } = this.props;
    const doctors = this.doctors.map(doctor => <Doctor key={doctor.id} doctor={doctor} />);
    return (
      <Wrapper {...rest} onClick={this.handleClick}>
        <DateContainer>
          <Date>
            {this.startDate}
          </Date>
          <DatePlaceholder>
            {t('Patients.AppointmentDate')}
          </DatePlaceholder>

        </DateContainer>
        <DetailContainer>
          <Specialization>
            {this.appointment.specialization.name}
          </Specialization>
          <AppointmentType>
            {this.appointment.consultation_type.name}
          </AppointmentType>
        </DetailContainer>
        <DoctorsContainer>
          {doctors}
        </DoctorsContainer>
      </Wrapper>
    );
  }
}

export default Appointment;