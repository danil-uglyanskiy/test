import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';

import { DetailList, Image } from 'components/ui';

import { AvatarIcon } from 'icons';
import moment from 'utils/moment';
import { t } from 'utils/localization';

const DmsContainer = styled.div`

`;

const DmsExpiredContainer = styled.div`
  color: #e95e5e;
  font-size: 14px;
  line-height: 16px;
`;

const InsurerNameContainer = styled.div`
  font-weight: 500;
`;

function insurerMapper(insurer) {
  const insurerArr = [];
  const { insurer_name } = insurer;

  insurerArr.push({ name: policeNameInformation(insurer_name) });
  insurer.policies.forEach(police => insurerArr.push(
    {
      name: police.number,
      extra: policeDateInformation(police.end_date)
    }
  ));

  return insurerArr;
}

function policeDateInformation(date) {
  return moment().isAfter(moment(date)) ?
    <DmsExpiredContainer>
      {t('Appointments.DMS.Expired')}
    </DmsExpiredContainer> :
    <DmsContainer>
      {moment(date).format('до DD MMMM YYYY')}
    </DmsContainer>;
}

function policeNameInformation(name) {
  return (
    <InsurerNameContainer>
      {name}
    </InsurerNameContainer>
  );
}

const NameContainer = styled.div`
  margin-top:14px;
  color: #4F5660;
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
  text-align: center;
`;

const PatientAvatar = styled.div`
  display: flex;
  justify-content: center;
  margin-top:30px;
`;

const Avatar = styled(Image)`
  width:83px;
  height:83px;
`;

const AvatarEmptyIcon = styled(AvatarIcon)`

`;


const DetailContainer = styled.div`
  margin-top:18px;
`;

const GenderContainer = styled.div`
  color: #747D8A;
	font-size: 14px;
	line-height: 16px;
  text-align: center;
  margin-top: 7px;
`;

const Wrapper = styled.div`
    position: relative;
    height: 100%;
`;

@inject('patientState')
@withTranslation()
@observer
class PatientInfo extends React.Component {

  static propTypes = {
    patientState: PropTypes.object,
    t: PropTypes.func
  }

  render() {
    const { t, patientState } = this.props;

    const medications = <DetailList heading={t('Patients.Medicines')} list={patientState.medications} />;
    const diseases = <DetailList heading={t('Patients.Diseases')} list={patientState.diseases} />;
    const allergies = <DetailList heading={t('Patients.Allergies')} list={patientState.allergies} />;
    const insurers = patientState.insurers.map(insurer => (
      <DetailList key={insurer.id} heading={t('Patients.DMCNumber')} list={insurerMapper(insurer)} />
    ));

    return (
      <Wrapper>
        <PatientAvatar>
          {patientState.avatar ?
            <Avatar
              className='avatar'
              url={patientState.avatar}
            /> : <AvatarEmptyIcon />}
        </PatientAvatar>
        <NameContainer>
          {t('UI.FullName', patientState.patient)}
        </NameContainer>
        <GenderContainer>
          {patientState.gender} • {patientState.age}
        </GenderContainer>
        <DetailContainer>
          {patientState.medications.length ? medications : ''}
          {patientState.diseases.length ? diseases : ''}
          {patientState.allergies.length ? allergies : ''}
          {patientState.insurers.length ? insurers : ''}
        </DetailContainer>
      </Wrapper>
    );
  }
}

export default PatientInfo;