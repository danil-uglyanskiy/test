import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';

import PoliciesState from './state/PoliciesState';
import PoliciesWrapper from './PoliciesWrapper';

import Loader from 'components/common/Loader';
// import { Button } from 'components/forms';
import {withTranslation} from 'react-i18next';

const Wrapper = styled.div`
  width:100%;
  position: relative;
  min-height: 200px;
`;

const EmptyPoliciesContainer = styled.div`
  height: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// const Divider = styled.div`
//   width: 100%;
//   background-color: #ECECEE;
//   height: 1px;
// `;

// const ButtonWrapper = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   margin-top: 20px;
//
//   ${Button} {
//     border-radius: 19px;
//     height: 32px;
//     font-size: 13px;
//     line-height: 16px;
//     padding: 7px 17px 9px 17px;
//   }
// `;

@inject('patientState')
@withTranslation()
@observer
class Policies extends React.Component {

  static propTypes = {
    t: PropTypes.func,
    patientState: PropTypes.object
  }

  constructor(props) {
    super(props);

    const { patientState } = props;
    this.policiesState = new PoliciesState(patientState.id);
  }

  componentDidMount() {
    this.policiesState.fetchPolicies();
  }

  componentWillUnmount() {
    this.policiesState.clearPolicies();
  }

  @computed get isFetched() {
    return this.policiesState.isFetched;
  }

  @computed get policies() {
    return this.policiesState.policies;
  }

  @computed get childrenPolicies() {
    return this.policiesState.childrensPolicies;
  }

  render() {
    const { t, ...rest } = this.props;

    if (!this.isFetched) {
      return <Loader />;
    }

    if(this.policies.length === 0 && this.childrenPolicies.length === 0) {
      return (
        <EmptyPoliciesContainer>
          {t('Patients.EmptyPolities')}
        </EmptyPoliciesContainer>
      );
    }

    return (
      <Wrapper {...rest}>
        {this.policies.length > 0 && (
          <PoliciesWrapper
            title={t('Patients.PersonalPolicies')}
            policies={this.policies}
          />
        )}

        {this.childrenPolicies.length > 0 && (
          <PoliciesWrapper
            title={t('Patients.ChildrensPolicies')}
            policies={this.childrenPolicies}
          />
        )}

        {/*<Divider />*/}

        {/*<ButtonWrapper>*/}
        {/*  <Button>*/}
        {/*    {t('Patients.SyncWithAccount')}*/}
        {/*  </Button>*/}
        {/*</ButtonWrapper>*/}
      </Wrapper>
    );
  }
}

export default Policies;