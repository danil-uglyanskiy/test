import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import { withTranslation } from 'react-i18next';

import { shortName } from 'utils/names';
import { Call, Chat, Video } from 'icons';

const Name = styled.span`
  font-size: 12px;
  color: #747d8a;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
  ${Chat}, ${Video}, ${Call}{
    width: 11px;
    height: 11px;
    cursor: pointer;
  }
`;

const icons = {
  audio: <Call />,
  chat: <Chat />,
  video: <Video />
};

@withTranslation()
@observer
class Patient extends React.Component {
  static propTypes = {
    t: PropTypes.func,
    patient: PropTypes.object,
    type: PropTypes.string
  }
  @computed get specializations() {
    const { patient } = this.props;

    return patient.specializations.map(specialization => specialization.name).join(', ');
  }

  @computed get patientName() {
    const { patient } = this.props;

    return shortName(patient);
  }

  showIcon = () => {
    const { type } = this.props;

    return icons[type];
  }

  render() {
    const { patient, t } = this.props;
    return (
      <Wrapper>
        <Name>
          {t('Format.MiddleFirstName', patient)}
        </Name>
        {this.showIcon()}
      </Wrapper>
    );
  }
}

export default Patient;
