import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject, Provider } from 'mobx-react';
import styled from 'styled-components';
import { computed } from 'mobx';
import { withTranslation } from 'react-i18next';

import Loader from 'components/common/Loader';
import { PatientInfo } from 'pages/Patients/components';
import { Ellipsis } from 'icons';

const EllipsisIcn = styled(Ellipsis)`
  width: 40px;
  height: 15px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width:100%;
`;

const Heading = styled.div`
	color: #A1ABB8;
	font-size: 16px;
	font-weight: bold;
	line-height: 19px;
`;

const Wrapper = styled.div`
  position: relative;
  height: 100%;
`;

@inject('patientState')
@withTranslation()
@observer
class Profile extends React.Component {

  static propTypes = {
    patientState: PropTypes.object,
    t: PropTypes.func
  }

  @computed get isFetched() {
    const { patientState } = this.props;

    return !!patientState.patient;
  }

  render() {
    const { t } = this.props;

    if (!this.isFetched) return <Loader />;

    return (
      <Provider profileState={this.profileState}>
        <Wrapper>
          <HeaderContainer>
            <Heading>
              {t('Patients.Information')}
            </Heading>
            <EllipsisIcn />
          </HeaderContainer>
          <PatientInfo />
        </Wrapper>
      </Provider>
    );
  }
}

export default Profile;