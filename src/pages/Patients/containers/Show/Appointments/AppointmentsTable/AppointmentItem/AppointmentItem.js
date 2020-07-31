import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { computed } from 'mobx';
import { observer, inject } from 'mobx-react';

import { TableRow, TableBodyCell } from 'components/tables/Table';
import moment from 'utils/moment';
import { Status } from 'components/ui';
import { Ellipsis } from 'icons';

import { shortName } from 'utils/names';

function ucfirst(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const EllipsisIcn = styled(Ellipsis)`
    width: 40px;
    height: 15px;
`;

const Wrapper = styled(TableRow)``;

@inject('patientState')
@observer
class AppointmentItem extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    appointment: PropTypes.object.isRequired,
    patientState: PropTypes.object,
    t: PropTypes.func
  };

  @computed get appointment() {
    const { appointment } = this.props;

    return appointment;
  }

  @computed get date() {
    const { start_date } = this.appointment;

    return moment(start_date).format('DD MMM YYYY');
  }

  @computed get time() {
    const { start_date } = this.appointment;

    return moment(start_date).format('hh:mm');
  }

  @computed get id() {
    const { patientState } = this.props;

    return patientState.id;
  }

  @computed get type() {
    return this.appointment.type;
  }

  @computed get patient() {
    const { patient } = this.appointment;

    return `${patient.last_name} ${patient.first_name}`;
  }

  @computed get doctors() {
    const { doctors } = this.appointment;

    return doctors.map(doctor => shortName(doctor)).join(', ');
  }

  @computed get specializations() {
    const { specialization } = this.appointment;

    return specialization.name;
  }

  @computed get status() {
    const { state } = this.appointment;

    return state;
  }

  render() {
    const { appointment, t, ...rest } = this.props;

    return (
      <Wrapper
        {...rest}
        link={`/patients/${this.id}/appointments/${appointment.id}`}
      >
        <TableBodyCell className='nowrap'>{this.date}</TableBodyCell>
        <TableBodyCell className='nowrap'>{this.time}</TableBodyCell>
        <TableBodyCell className='nowrap'>{t(`Appointments.Types.${ucfirst(this.type)}`)}</TableBodyCell>
        <TableBodyCell className='nowrap'>{this.patient}</TableBodyCell>
        <TableBodyCell className='nowrap'>{this.doctors}</TableBodyCell>
        <TableBodyCell className='nowrap'>{this.specializations}</TableBodyCell>
        <TableBodyCell className='nowrap'><Status status={this.status} /></TableBodyCell>
        <TableBodyCell className='nowrap'><EllipsisIcn /></TableBodyCell>
      </Wrapper>
    );
  }
}

export default styled(withTranslation()(AppointmentItem))``;
