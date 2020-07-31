import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: ${props => props.color};
  margin: ${props => props.margin}; 
`;

class Divider extends React.Component {
  render() {
    const { ...rest } = this.props;

    return (
      <Wrapper {...rest} />
    );
  }
}

export default styled(Divider)``;
