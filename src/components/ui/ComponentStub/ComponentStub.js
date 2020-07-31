import React from 'react';
import styled, { css } from 'styled-components';

import { StubbedComponent } from '.';

const Avatar = styled(StubbedComponent)`
  ${({ size = 'default' }) => css`
    flex-grow: 0;
    flex-shrink: 0;
    border-radius: 100%;

    ${size === 'small' && css`
      width: 36px;
      height: 36px;
    `}

    ${size === 'default' && css`
      width: 54px;
      height: 54px;
    `}

    ${size === 'large' && css`
      width: 84px;
      height: 84px;
    `}
  `}
`;

const Tabs = styled(StubbedComponent)`
  height: 38px;
  border-radius: 100px;
`;

const Title = styled(StubbedComponent)`
  height: 32px;
`;

const SubTitle = styled(StubbedComponent)`
  height: 20px;
`;

const Text = styled(StubbedComponent)`
  height: 14px;
  opacity: 0.125;
`;

const Button = styled(StubbedComponent)`
  ${({ size = 'default', rounded = false }) => css`
    width: 100%;
    border-radius: 4px;

    ${size === 'small' && css`
      height: 32px;
    `}

    ${size === 'default' && css`
      height: 48px;
    `}

    ${rounded && css`
      border-radius: 32px;
    `}
  `}
`;

const TextInput = styled(StubbedComponent)`
  height: 35px;
  border-radius: 4px;
`;

class ComponentStub extends React.PureComponent {
  static Avatar = Avatar;

  static Tabs = Tabs;

  static Title = Title;

  static SubTitle = SubTitle;

  static Text = Text;

  static Button = Button;

  static TextInput = TextInput;

  render() {
    return null;
  }
}

export default ComponentStub;
