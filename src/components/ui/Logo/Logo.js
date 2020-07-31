import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { HeaderLogo } from 'icons';

const LogoIcon = styled(HeaderLogo)``;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: inherit;
  border-right: 1px solid #e7eaed;
  font-size: 14px;
  font-weight: bold;
  color: #2d91ff;
  padding: 10px;
`;

const Wrapper = styled(Link)`
  display: block;
  height: 100%;
  
`;

class Logo extends React.Component {
  render() {
    return (
      <Wrapper exact='true' to='/'>
        <LogoWrapper>
          <LogoIcon />
        </LogoWrapper>
      </Wrapper>
    );
  }
}

export default styled(Logo)``;
