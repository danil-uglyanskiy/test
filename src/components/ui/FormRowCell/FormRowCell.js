import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { ReactComponentChildrenPropType } from 'types/customPropTypes';

const Wrapper = styled.div`
  ${({ cols, widthOffset }) => css`
    width: calc(100% * ${cols} / 12 + ${widthOffset}px);

    &:not(:first-child) {
      padding-left: 8px;
    }
  
    &:not(:last-child) {
      padding-right: 8px;
    }
  `}
`;

class FormRowCell extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: ReactComponentChildrenPropType.isRequired,
    cols: PropTypes.number,
    widthOffset: PropTypes.number
  };

  static defaultProps = {
    className: '',
    cols: 12,
    widthOffset: 0
  };

  render() {
    const { children, ...rest } = this.props;

    return (
      <Wrapper {...rest}>
        {children}
      </Wrapper>
    );
  }
}

export default styled(FormRowCell)``;
