import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  border: 1px solid #e7eaed;
  border-radius: 4px;

  & input {
    border: none;
  }

  & > div:first-child {
    position: relative;

    &:before {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 2px;
      height: 25px;
      background-color: #e7eaed;
    }
  }
`;

class DoubleDatePicker extends React.Component {
  static propTypes = {
    children: PropTypes.any
  }
  
  render() {
    const { children } = this.props;

    return (
      <Wrapper>
        {children}
      </Wrapper>
    );
  }
}

export default DoubleDatePicker;
