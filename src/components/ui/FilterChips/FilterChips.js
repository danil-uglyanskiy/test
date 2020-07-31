import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Cancel } from 'icons';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  color: #4f5660;
  font-size: 12px;
  background-color: #e4e9f2;
  border-radius: 16.5px;
  height: 33px;
  padding: 10px 13px;
  margin-right: 4px;
  flex-shrink: 0;
`;

const CancelIcon = styled(Cancel)`
  display: inline-block;
  margin-left: 10px;
  cursor: pointer;
`;

class FilterChips extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any,
    onRemove: PropTypes.func
  }
  
  render() {
    const { children, onRemove } = this.props;

    return (
      <Wrapper>
        {children}
        <CancelIcon onClick={onRemove} />
      </Wrapper>
    );
  }
}

export default styled(FilterChips)``;
