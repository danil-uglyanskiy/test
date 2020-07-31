import React from 'react';
import { ReactComponent as CheckIcon } from './assets/check_icon.svg';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 13px;
  border: 1px solid #E5F2FF;
  padding: 4px 13px;
  height: 24px;
  background-color: #E5F2FF;
`;

const CheckIconS = styled(CheckIcon)`
  
`;

const Title = styled.div`
  font-size: 13px;
  line-height: 15px;
  color: #1A7CE8;
  text-align: left;
  margin-left: 6px;
`;

class Badge extends React.Component {
  static propTypes = {
    children: PropTypes.string
  }

  render() {
    const { children } = this.props;

    return (
      <Wrapper>
        <CheckIconS />
        <Title>
          {children}
        </Title>
      </Wrapper>
    );
  }
}


export default styled(Badge)``;