import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import { computed } from 'mobx';

import { shortName } from 'utils/names';
import { Image } from 'components/ui';
import { AvatarIcon } from 'icons';

const DoctorAvatar = styled.div`
  width: 36px;
  height: 36px;
`;

const InformationContainer = styled.div`
  margin-left: 8px;
`;

const NameContainer = styled.div`
	color: #4F5660;
	font-size: 14px;
	line-height: 16px;
`;

const SpecializationContainer = styled.div`
	color: #747D8A;
	font-size: 13px;
  line-height: 15px;
  margin-top: 2px;
`;

const Avatar = styled(Image)`
  width:36px;
  height:36px;
`;

const AvatarEmptyIcon = styled(AvatarIcon)`
  width: 36px;
  height: 36px;
`;

const Wrapper = styled.div`
  width:100%;
  display: flex;
  margin-bottom: 5px;
  &:nth-last-child(1){
    margin-bottom: 0;
  }
`;

@withTranslation()
@observer
class Doctor extends React.Component {

  static propTypes = {
    t: PropTypes.func,
    appointment: PropTypes.object,
    doctor: PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  @computed get doctor() {
    const { doctor } = this.props;

    return doctor;
  }

  @computed get avatar() {
    return this.doctor.avatar && this.doctor.avatar.image_urls.thumb;
  }

  render() {
    const { t, ...rest } = this.props;

    return (
      <Wrapper {...rest}>
        <DoctorAvatar>
          {this.avatar ?
            <Avatar
              className='avatar'
              url={this.avatar}
            /> : <AvatarEmptyIcon />}
        </DoctorAvatar>
        <InformationContainer>
          <NameContainer>
            {shortName(this.doctor)}
          </NameContainer>
          <SpecializationContainer>
            {t('Patients.Doctor')}
          </SpecializationContainer>
        </InformationContainer>
      </Wrapper>
    );
  }
}

export default Doctor;