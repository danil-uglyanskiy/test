import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';

import Doctor from './Doctor';
import Patient from './Patient';
import { isPast } from 'utils/moment';
import { DropdownMenu } from 'components/ui';
import { Ellipsis } from 'icons';

const Wrapper = styled.div`
  width: 220px;
  height: min-content;
  border: 1px solid #cdd3da;
  border-radius: 4px;
  margin-bottom: 12px;
  padding: 15px;
  padding-bottom:0px;
`;

const DoctorsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width:100%;
  border-bottom: 1px solid #cdd3da;
  padding-bottom: 10px;
`;

const DoctorContainer = styled.div``;

const DotsMenuContainer = styled.div``;

const EllipsisIcn = styled(Ellipsis)`
  width: 16px;
  fill: #A1ABB8;
  height: 15px;
`;

const Label = styled.div`
  font-size: 12px;
  line-height: 12px;
  font-weight: 500;
  ${props => props.failed && css`
    color: red;
    margin-bottom: 10px;
  `}
`;

@inject('appointmentsState')
@withTranslation()
@observer
class Appointment extends React.Component {

  static propTypes = {
    appointment: PropTypes.object,
    t: PropTypes.func,
    appointmentsState: PropTypes.object
  };

  @computed get doctors() {
    const { appointment } = this.props;
    return appointment.doctors;
  }

  @computed get patient() {
    const { appointment } = this.props;
    return appointment.patient;
  }

  @computed get items() {
    const { t, appointment } = this.props;
    return [
      {
        label: <Label>{t('UI.Cancel')}</Label>,
        onClick: this.handleCancelClick,
        disabled: isPast(appointment.start_date)
      }
    ];
  }

  @computed get isFailed() {
  const { appointment: { state } } = this.props;
  return state === 'failed';
  }

  handleCancelClick = () => {
    const { appointment, appointmentsState } = this.props;
    appointmentsState.setSelectedAppointment(appointment);
  };

  render() {
    const { appointment } = this.props;
    const { type } = appointment;
    const listItems = this.doctors.map(doctor => <Doctor appointment={appointment} key={doctor.id} doctor={doctor} />);
    
    return (
      <Wrapper>
        {this.isFailed && (
          <Label failed>Отменено</Label>
        )}
        <DoctorsContainer>
          <DoctorContainer>
            {listItems}
          </DoctorContainer>
          <DotsMenuContainer>
            <DropdownMenu
              items={this.items}
              icon={<EllipsisIcn />}
              dropAlign={{ "top": "top", "right": "right" }}
            />
          </DotsMenuContainer>
        </DoctorsContainer>
        {this.patient && <Patient patient={this.patient} type={type} />}
      </Wrapper>
    );
  }
}

export default styled(Appointment)``;
