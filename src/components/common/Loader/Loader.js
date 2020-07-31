import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import Spinner from './Spinner';
import { display } from 'theme/mixins';

const LoaderContainer = styled.div`
    width:100%;
    position:absolute;
    top:0;
    left:0;
    height:100%;
    ${display('flex', 'center', 'center')};
    flex-wrap:wrap;
    ${Spinner} {
      align-self:flex-end;
    }
`;

const ChildContainer = styled.div`
  width:100%;
  align-self:flex-start;
  ${display('flex', 'flex-start', 'center')};
  margin-top:30px;
`;

const Wrapper = styled.div``;

@observer
class Loader extends Component {
  static propTypes = {
    child: PropTypes.object
  }

  render() {
    const { child } = this.props;
    return (
      <Wrapper>
        <LoaderContainer>
          <Spinner />
          <ChildContainer>
            {child}
          </ChildContainer>
        </LoaderContainer>
      </Wrapper>
    );
  }
}

export default Loader;
