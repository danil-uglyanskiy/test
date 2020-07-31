import React from 'react';
import PropTypes from 'prop-types';
import { Provider, observer } from 'mobx-react';
import styled, { css } from 'styled-components';
import { computed } from 'mobx';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import PatientState from './state/PatientState';

import InfoPage from './InfoPage';
import { Navbar, Tabs, Breadcrumbs } from 'components/ui';
import { DefaultLayout as Layout } from 'components/layouts';
import Appointments from './Appointments';


const items = [
  {
    name: 'Инфо',
    id: 'info'
  },
  {
    name: 'Приемы',
    id: 'appointments'
  }
];

const Heading = styled.div`
	color: #4F5660;
	font-size: 24px;
	font-weight: 500;
  line-height: 29px;
  grid-column:1;
`;

const HeadingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 197px;
`;

const TabsContainer = styled.div`
  grid-column:2;
  display: flex;
  justify-content: center;
`;

const Header = styled(Layout.Header)`
  ${({ hasChat }) => hasChat && css`
      width:1300px;
  `}
`;

const Body = styled(Layout.Body)`
  ${({ hasChat }) => hasChat && css`
      width:1300px;
  `}
`;

@withRouter
@withTranslation()
@observer
class Show extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    t: PropTypes.func,
    history: PropTypes.object
  }

  constructor(props) {
    super(props);

    const { match } = props;
    const { params } = match;
    const { id, appointmentId, type } = params;

    this.patientState = new PatientState(id, appointmentId, type);
  }

  componentDidMount() {
    this.patientState.fetch();
  }

  componentDidUpdate(prevProps) {
    const { type } = this.props.match.params;

    if (prevProps.match.params.type !== type) {
      type && this.patientState.setType(type);
    }
  }

  componentWillUnmount() {
    this.patientState.dispose();
  }

  @computed get patient() {
    return this.patientState.patient;
  }

  @computed get hasChat() {
    return !!this.patientState.appointmentId && this.patientState.type === 'appointments';
  }

  @computed get breadcrumbsList() {
    const { t, history } = this.props;

    const list = [
      {
        name: t('Patients'),
        onClick: () => { history.push('/patients'); }
      }
    ];

    if (this.patientState.type === 'info') {
      list.push({
        name: t('Patients.Profile'),
        onClick: () => { history.push(`/patients/${this.patientState.id}/info`); }
      });
    } else {
      list.push({
        name: t('Patients.Appointments'),
        onClick: () => { history.push(`/patients/${this.patientState.id}/appointments`); }
      });
    }

    if (this.patientState.type === 'appointments' && !!this.patientState.appointmentId) {
      list.push({
        name: t('Patients.AppointmentData')
      });
    }

    return list;
  }

  handleChangeTabs = (type) => {
    const { history } = this.props;

    this.patientState.setType(type);
    history.push(`/patients/${this.patientState.id}/${type}`);
  }

  render() {

    return (
      <Provider
        patientState={this.patientState}
      >
        <Layout>
          <Layout.Nav>
            <Navbar />
          </Layout.Nav>
          <Header hasChat={this.hasChat}>
            <HeadingContainer>
              <Heading>
                <Breadcrumbs list={this.breadcrumbsList} />
              </Heading>
              <TabsContainer>
                <Tabs
                  items={items}
                  value={this.patientState.type}
                  onChange={this.handleChangeTabs}
                />
              </TabsContainer>
            </HeadingContainer>
          </Header>

          <Body hasChat={this.hasChat}>
            {this.patientState.type === 'info' && <InfoPage />}
            {this.patientState.type === 'appointments' && <Appointments />}
          </Body>

        </Layout>
      </Provider>
    );
  }
}

export default Show;