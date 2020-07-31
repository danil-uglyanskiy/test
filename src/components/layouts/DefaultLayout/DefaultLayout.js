import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Overlay } from 'components/ui';

const Wrapper = styled.div``;

const Nav = styled.div`
  position: absolute;
  width: 100%;
  height: 65px;
  background-color: #ffffff;
  box-shadow: 0 4px 4px 1px #DBDDE0;
  z-index: 10;
`;

const Header = styled.div`
  width: ${props => props.width || '1040px'};
  margin: 122px auto 30px;
`;

const Body = styled.div`
  width: ${props => props.width || '1040px'};
  margin: 0 auto;
`;

const OffcanvasRight = styled(Overlay)`
  width: auto;
  height: 100vh;
  background-color: #ffffff;
  overflow: auto;
  z-index: 1;
`;

class DefaultLayout extends React.Component {
  
  static propTypes = {
    children: PropTypes.any
  }

  static Nav = Nav;
  static Header = Header;
  static Body = Body;
  static OffcanvasRight = OffcanvasRight;

  render() {
    const { children } = this.props;

    return (
      <Wrapper>
        {children}
      </Wrapper>
    );
  }
}

export default styled(DefaultLayout)``;
