import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { display } from 'theme/mixins';

const Wrapper = styled.div`
  ${display('flex', 'center', 'space-between')};
  position: relative;
  padding: ${props => props.noPadding ? 0 : '11px 0'};
`;

class FormRow extends React.Component {
  static propTypes = {
    children: PropTypes.any
  }
  
  render() {
    const { children, ...rest } = this.props;

    return (
      <Wrapper {...rest}>
        {children}
      </Wrapper>
    );
  }
}

export default styled(FormRow)``;
