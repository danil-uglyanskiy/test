import React from 'react';
import PropTypes from 'prop-types';
import { observer, Provider } from 'mobx-react';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';

import { DefaultLayout as Layout } from 'components/layouts';
import { Navbar, FiltersPanel } from 'components/ui';
import { InitialsFilter } from './Filters/InitialsFilter';
import { PolicyFilter } from './Filters/PolicyFilter';

import Patients from './Patients';
import PatientsState from './state/PatientsState';
import Qs from "qs";

const Heading = styled.div`
	color: #4F5660;
	font-size: 24px;
	font-weight: 500;
	line-height: 29px;
`;

@withTranslation()
@observer
class List extends React.Component {

  static propTypes = {
    t: PropTypes.func,
    location: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.patientsState = new PatientsState();
  }

  componentDidMount() {
    const { location: { search } } = this.props;
    const { page } = Qs.parse(search, { ignoreQueryPrefix: true });
    const pageNumber = page ? page : 1;

    this.patientsState.fetch(pageNumber);
  }

  handleOnSaveFilters = (filters) => {
    this.patientsState.filterParams(filters);
    this.patientsState.fetch();
  }


  componentWillUnmount() {
    this.patientsState.dispose();
  }

  render() {
    const { t } = this.props;

    return (
      <Provider
        patientsState={this.patientsState}
      >
        <Layout>
          <Layout.Nav>
            <Navbar />
          </Layout.Nav>
          <Layout.Header>
            <Heading>
              {t('Patients')}
            </Heading>
          </Layout.Header>

          <Layout.Body>
            <FiltersPanel
              items={[
                {
                  type: 'chars',
                  label: t('Patients.Filters.Initials.Label'),
                  unique: true,
                  component: InitialsFilter,
                },
                {
                  type: 'policy_number',
                  label: t('Patients.Filters.Policy.Label'),
                  unique: true,
                  component: PolicyFilter,
                }
              ]}
              onChange={this.handleOnSaveFilters}
            />
            <Patients />
          </Layout.Body>

        </Layout>
      </Provider>
    );
  }
}

export default List;
