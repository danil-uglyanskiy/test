import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { withTranslation } from 'react-i18next';

import { TableRow, TableBodyCell } from 'components/tables/Table';
import moment from 'utils/moment';
import { shortName } from 'utils/names';

const Cell = styled(TableBodyCell)`
  overflow: hidden;
  max-width:200px;
  text-overflow: ellipsis;
`;

const Wrapper = styled(TableRow)``;

class PatientItem extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    patient: PropTypes.object.isRequired,
    t: PropTypes.func
  };

  @computed get insurers() {
    const { patient } = this.props;
    const { insurers } = patient;

    return insurers ? insurers.toJSON() : [];
  }

  @computed get insurersName() {
    return this.insurers.map(insurer => insurer.insurer_name).join(', ');
  }

  @computed get policies() {
    return this.insurers.policies ? this.insurers.policies.toJSON() : [];
  }

  @computed get dmcNumber() {
    return this.insurers.map(insurer => insurer.policies.map(policy => policy.number).join(', ')).join(', ');
  }

  @computed get birthDate() {
    const { patient } = this.props;
    const { birth_date } = patient;

    return moment(birth_date).format('DD MMM YYYY');
  }

  @computed get name() {
    const { patient } = this.props;
    return shortName(patient);
  }

  render() {
    const { patient, t, ...rest } = this.props;
    const { id } = patient;

    return (
      <Wrapper
        {...rest}
        link={`/patients/${id}/info`}
      >
        <Cell className='nowrap' title={this.name}>{this.name}</Cell>
        <Cell className='nowrap' title={this.birthDate}>{this.birthDate}</Cell>
        <Cell className='nowrap' title={this.insurersName}>{this.insurersName}</Cell>
        <Cell className='nowrap' title={this.dmcNumber}>{this.dmcNumber}</Cell>
      </Wrapper>
    );
  }
}

export default styled(withTranslation()(PatientItem))``;
