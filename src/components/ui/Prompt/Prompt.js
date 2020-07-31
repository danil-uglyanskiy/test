import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ReactComponentChildrenPropType } from 'types/customPropTypes';

import { Buttons, Content, Footer, Title } from './components';

const Wrapper = styled.div`
    background: white;
    top: 0;
    border-radius: 4px;
    width:540px;
    box-shadow: 0 2px 6px 0 rgba(36, 95, 119, 0.21);
`;

class Prompt extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: ReactComponentChildrenPropType.isRequired
  };

  static defaultProps = {
    className: ''
  };

  static Buttons = Buttons;

  static Content = Content;

  static Footer = Footer;

  static Title = Title;

  render() {
    const { children, ...rest } = this.props;

    return (
      <Wrapper {...rest}>
        {children}
      </Wrapper>
    );
  }
}

export default styled(Prompt)``;
