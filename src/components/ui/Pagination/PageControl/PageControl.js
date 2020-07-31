import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled, { css, withTheme } from 'styled-components';

import { Triangle } from 'icons';

import { display } from 'theme/mixins';

const text = {
  right: 'Далее',
  left: 'Назад'
};
const TextContainer = styled.div`
	color: #1A7CE8;
	font-size: 13px;
	font-weight: 500;
	line-height: 16px;
`;

const Wrapper = styled.div`
  ${({ disabled, direction }) => css`
    ${display('flex', 'center', 'center')}
    margin: 0 8px;
    display: flex;
    cursor: pointer;
    box-sizing: border-box;
    border: 1px solid #E7EAED;
    border-radius: 20px;
    background-color: #FFFFFF;
    width: 97px;
    height: 34px;
    justify-content: center;
    align-items: center;
    transition:
      color 0.25s,
      padding-left 0.25s,
      padding-right 0.25s;
    
    ${disabled && css`
      display: none;
      cursor: default;
      opacity: 0.35;
    `}

    ${!disabled && css`
      :hover {

      }
    `}
    ${direction === 'left' && css`
      flex-direction: row-reverse;
    `}
  `}
`;

const TriangleIcon = styled(Triangle)`
  ${({ direction }) => css`
    ${direction === 'left' && css`
      transform: rotate(90deg);
      margin-right: 11px;
    `}

    ${direction === 'right' && css`
      transform: rotate(-90deg);
      margin-left: 11px;
    `}

    path {
      fill: #2D91FF;
    }
  `}
`;

@withTheme
class PageControl extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    direction: PropTypes.oneOf([
      'left',
      'right'
    ]),
    link: PropTypes.string,
    fetch: PropTypes.func,
    current: PropTypes.number
  };

  static defaultProps = {
    className: '',
    direction: 'left'
  };

  render() {
    const { direction, fetch, current, disabled, link, ...rest } = this.props;
    return (
      <Wrapper
        {...rest}
        as={!disabled && Link}
        disabled={disabled}
        direction={direction}
        to={link}
        onClick={() => fetch(current)}
      >
        <TextContainer>
          {text[direction]}
        </TextContainer>
        <TriangleIcon direction={direction} />
      </Wrapper>
    );
  }
}

export default styled(PageControl)``;
