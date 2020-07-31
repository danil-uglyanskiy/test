import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import { observable, action, computed } from 'mobx';

import Appointments from './Appointments';
import Profile from './Profile';
import { Tabs } from 'components/ui';
import Policies from './Policies/Policies';

const items = [
  {
    name: 'Осмотры',
    id: 'appointments'
  },
  {
    name: 'Заболевания',
    id: 'diseases',
    disabled: true
  },
  {
    name: 'Исследования',
    id: 'exployers',
    disabled: true
  },
  {
    name: 'Полисы',
    id: 'policies'
  }
];

const TABS_MAPPER = {
  appointments: Appointments,
  policies: Policies
};

const TabsContainer = styled.div`
  width:100%;
  margin-top: 17px;
`;

const Heading = styled.div`
	color: #A1ABB8;
	font-size: 16px;
	font-weight: bold;
	line-height: 19px;
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
  margin-top:35px;
`;

const DetailContainer = styled.div`
  grid-column: 2;
  padding-left: 22px;
  position: relative;
`;

const Wrapper = styled.div`
  width:100%;
  padding: 33px 22px;
  background:white;
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

@inject('patientState')
@withTranslation()
@observer
class InfoPage extends React.Component {
  
  static propTypes = {
    t: PropTypes.func
  }

  @observable type = 'appointments';

  @action
  setType = (type) => {
    this.type = type;
  }

  @computed get currentTab() {
    const CurrentTab = TABS_MAPPER[this.type];

    return CurrentTab ? <CurrentTab /> : null;
  }

  handleChangeTab = (type) => {
    this.setType(type);
  }

  render() {
    const { t, ...rest } = this.props;

    return (
      <Wrapper {...rest}>
        <MainContainer>
          <Heading>
            {t('Patients.History')}
          </Heading>
          <TabsContainer>
            <Tabs
              value={this.type}
              items={items}
              type='secondary'
              onChange={this.handleChangeTab}
            />
          </TabsContainer>
          <Content>
            {this.currentTab}
          </Content>
        </MainContainer>
        <DetailContainer>
          <Profile />
        </DetailContainer>
      </Wrapper>
    );
  }
}

export default InfoPage;