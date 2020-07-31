import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Plus2 } from "icons";

const Container = styled.div`
  height: 100%;
  border: 2px solid #ffffff;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;

  width: ${props => props.width}px;
  transform: translateX(${props => props.offset || 0}px);

  :before {
    content: 'c ' attr(title);
    color: #ffffff;
    font-family: "Helvetica Neue";
    font-size: 10px;
    font-weight: 500;
    z-index:3;
    line-height: 12px;
    position: absolute;
    top: -7px;
    white-space: nowrap;
    transform: translateY(-100%);
  }

  :not(:hover) {
      opacity: 0;
  }
`;

const Icon = styled(Plus2)`
  color: #fff;
  width: 16px;
  height: 16px;
`;

class HoverPlus extends React.Component {
  static propTypes = {
    offset: PropTypes.number
  }

  render() {
    const { offset, ...rest } = this.props;
    return (
      <Container offset={offset} {...rest}>
        <Icon />
      </Container>
    );
  }
}

export default styled(HoverPlus)``;
