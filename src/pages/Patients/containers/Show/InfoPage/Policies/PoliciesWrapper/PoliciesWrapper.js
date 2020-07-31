import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PolicyCard from '../PolicyCard';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
`;

const Title = styled.div`
  font-size: 16px;
  line-height: 19px;
  color: #A1ABB8;
  text-align: left;
  margin-bottom: 17px;
  font-weight: bold;
`;

const PoliciesCardsWrapper = styled.div`
  & > * + * {
    margin-top: 20px;
  }
`;

class PoliciesWrapper extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    policies: PropTypes.array
  }

  render() {
    const { title, policies } = this.props;

    const policiesCards = policies.map(policy => <PolicyCard key={policy.id} {...policy} />);

    return (
      <Wrapper>
        <Title>
          {title}
        </Title>
        <PoliciesCardsWrapper>
          {policiesCards}
        </PoliciesCardsWrapper>
      </Wrapper>
    );
  }
}


export default styled(PoliciesWrapper)``;