import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  animation-name: highlighting;
  animation-duration: 3s;
  animation-timing-function: ease-in;
  animation-iteration-count: infinite;
  background-color: #a1abb8;
  opacity: 0.25;

  @keyframes highlighting {
    0% {
      background-color: #a1abb8;
    }

    50% {
      background-color: '#f5f6f8';
    }

    100% {
      background-color: #a1abb8;
    }
  }
`;

class StubbedComponent extends React.Component {
  static propTypes = {
    className: PropTypes.string
  }

  render() {
    const { className } = this.props;

    return (
      <Wrapper className={className} />
    );
  }
}

export default styled(StubbedComponent)``;
