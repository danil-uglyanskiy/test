import React from 'react';
import { computed } from 'mobx';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';

import PatientsList from './PatientsList';
import PatientItem from './PatientItem';
import { Pagination } from 'components/ui';

const limit = 10;

const Wrapper = styled.div``;

@withRouter
@inject('patientsState')
@observer
class Doctors extends React.Component {
  static propTypes = {
    patientsState: PropTypes.object
  };

  @computed get patients() {
    const { patientsState } = this.props;

    return [...patientsState.patients];
  }

  @computed get total() {
    const { patientsState } = this.props;

    return patientsState.totalLength;
  }

  handlePageChange = (page) => {
    const { patientsState } = this.props;

    patientsState.fetch(page);
  };

  render() {
    const patients = this.patients.map((patient, i) => (
      <PatientItem key={i} patient={patient} />
    ));

    const totalPages = Math.floor(this.total / limit) + 1;

    const pagintation = <Pagination onChange={this.handlePageChange} total={totalPages} />;

    return (
      <Wrapper>
        <PatientsList>
          {patients}
        </PatientsList>
        {totalPages > 1 ? pagintation : ''}
      </Wrapper>
    );
  }
}

export default Doctors;
