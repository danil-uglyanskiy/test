import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const sizes = {
  xSmall: css`
    width: 16px;
    height: 16px;
  `,

  small: css`
    width: 28px;
    height: 28px;
  `,

  medium: css`
    width: 48px;
    height: 48px;
  `
};

const Wrapper = styled.div`
  ${({ colors, size }) => css`
    ${sizes[size]}
    border: 3px solid #dbdbdb;
    border-bottom-color: #1a7ce8;
    border-radius: 50%;
    animation: spin .75s infinite linear;

    @keyframes spin {
      100% {
        transform: rotate(360deg);
      }
    }
  `}
`;

class Spinner extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    size: PropTypes.string
  };

  static defaultProps = {
    className: '',
    size: 'medium'
  };

  render() {
    const { ...rest } = this.props;

    return (
      <Wrapper {...rest} />
    );
  }
}

export default styled(Spinner)``;
