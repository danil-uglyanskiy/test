import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Legend = styled.legend`
  font-size: 22px;
  font-weight: 700;
`;

const Wrapper = styled.fieldset`
  &:not(:first-child) {
    margin-top: 2rem;
  }

  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

class FieldSet extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any
  }

  static Legend = Legend;

  render() {
    const { children } = this.props;

    return (
      <Wrapper>
        {children}
      </Wrapper>
    );
  }
}

export default FieldSet;
