import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { computed } from 'mobx';

import PatientAppointmentState from './state';

import { Chat } from 'components/ui';
import { PatientInfo, AppointmentDetailList } from 'pages/Patients/components';
import Loader from 'components/common/Loader';
import Doctor from './Doctor';


const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const DoctorsContainer = styled.div`
  margin-top: 13px;
`;

const ConsultationTypeContainer = styled.div`
  color: #A1ABB8;
  font-size: 16px;
  font-weight: bold;
  line-height: 19px;
`;

const DateContainer = styled.div`
	color: #747D8A;
	font-size: 13px;
	line-height: 15px;
`;

const ChatContainer = styled.div`
  width:100%;
  height: 500px;
`;

const MainContainer = styled.div`
    grid-column: 1;
    padding-right:22px;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      border-right: 1px solid #ECECEE;
      height: calc(100% + 66px);
      top: -33px;
      left: 100%;
    }
`;

const Content = styled.div`
    margin-top: 5px;
`;

const DetailContainer = styled.div`
    grid-column: 2;
    padding-left: 22px;
    position: relative;
    padding-right:22px;
    &:before {
      content: '';
      position: absolute;
      border-right: 1px solid #ECECEE;
      height: calc(100% + 66px);
      top: -33px;
      left: 100%;
    }
`;

const Wrapper = styled.div`
    width:100%;
    padding: 33px 22px;
    background:white;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
`;

@inject('patientState')
@withRouter
@withTranslation()
@observer
class Appointment extends React.Component {

  static propTypes = {
    t: PropTypes.func,
    match: PropTypes.object,
    patientState: PropTypes.object
  }

  constructor(props) {
    super(props);

    const { match } = props;
    const { params } = match;
    const { appointmentId } = params;

    this.patientAppointmentState = new PatientAppointmentState(appointmentId);
  }

  componentDidMount() {
    this.patientAppointmentState.fetch();
  }

  @computed get isFetched() {
    const { patientState } = this.props;
    return !!this.patientAppointmentState.appointment && !!patientState.patient;
  }

  render() {
    const { t, ...rest } = this.props;

    if (!this.isFetched) return <Loader />;

    const doctors = this.patientAppointmentState.doctors.map(doctor => <Doctor key={doctor.id} doctor={doctor} />);

    const content = (
      <Content>
        <AppointmentDetailList {...this.patientAppointmentState.complaints} />
        <AppointmentDetailList {...this.patientAppointmentState.opinion} />
        <AppointmentDetailList {...this.patientAppointmentState.advices} />
      </Content>
    );

    return (
      <Wrapper {...rest}>
        <MainContainer>
          <Heading>
            <ConsultationTypeContainer>
              {this.patientAppointmentState.consultationType} • {this.patientAppointmentState.specialization}
            </ConsultationTypeContainer>
            <DateContainer>
              {this.patientAppointmentState.date}
            </DateContainer>
          </Heading>
          <DoctorsContainer>
            {doctors}
          </DoctorsContainer>
          {this.patientAppointmentState.anamnesis && content}
        </MainContainer>
        <DetailContainer>
          <PatientInfo />
        </DetailContainer>
        <ChatContainer>
          <Chat conversation={this.patientAppointmentState.appointment.conversation} />
        </ChatContainer>
      </Wrapper>
    );
  }
}

export default Appointment;