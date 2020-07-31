import React from 'react';
import { observer } from 'mobx-react';
import styled, { css } from 'styled-components';
import { computed } from 'mobx';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import moment from 'moment';

import Badge from '../Badge';

const Title = styled.div`
  font-size: 14px;
  line-height: 17px;
  color: #4F5660;
  text-align: left;
  font-weight: 500;
`;

const Description = styled.div`
  font-size: 13px;
  line-height: 15px;
  color: #4F5660;
  text-align: left;
  margin-right: 4px;
`;

const Date = styled(Description)`
  ${({expired}) => expired && css`
    color: #E95E5E;
  `}
`;

const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const InfoWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  & > ${Title} + ${DescriptionWrapper} {
    margin-top: 8px;
  }
`;



const Wrapper = styled.div`
  display: flex;
  border-radius: 5px;
  border: 1px solid #E7EAED;
  padding: 15px 17px 17px 17px;
  justify-content: space-between;
`;


@withTranslation()
@observer
class PolicyCard extends React.Component {
  static propTypes = {
    insurer: PropTypes.object,
    number: PropTypes.string,
    end_date: PropTypes.string,
    telemed_available: PropTypes.bool,
    t: PropTypes.func.isRequired
  }

  @computed get insurerName() {
    const {insurer} = this.props;

    return insurer?.insurer_name;
  }

  dateFormatter(endDate, isExpired) {
    const { t } = this.props;

    if(isExpired) {
      return `${t('Patients.PolicyDateExpired')} ${moment(endDate).format('YY.MM.DD')}`;
    }

    return `${t('Patients.PolicyValidUntil')} ${moment(endDate).format('LL')}`;
  }

  @computed get descriptionCard() {
    const {end_date} = this.props;

    const endDate = end_date;
    const nowDate = moment();
    const isExpired = nowDate.isAfter(endDate);
    const date = this.dateFormatter(endDate, isExpired);


    return (
      <DescriptionWrapper>
        <Description>
          {`${this.insurerName} ・`}
        </Description>
        <Date expired={isExpired}>
          {date}
        </Date>
      </DescriptionWrapper>
    );
  }

  render() {
    const {number, t, telemed_available} = this.props;

    return (
      <Wrapper>
        <InfoWrapper>
          <Title>
            {number}
          </Title>
          {this.descriptionCard}
        </InfoWrapper>
        {telemed_available && (
          <Badge>
            {t('Patients.Telemedicine')}
          </Badge>
        )}
      </Wrapper>
    );
  }
}


export default styled(PolicyCard)``;