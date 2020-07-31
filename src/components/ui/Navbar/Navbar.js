import React from 'react';
import styled from 'styled-components';

import { HeaderNav, UserMenu } from 'components/ui';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

class Navbar extends React.Component {
  render() {
    return (
      <Wrapper>
        <HeaderNav />
        <UserMenu />
      </Wrapper>
    );
  }
}

export default styled(Navbar)``;