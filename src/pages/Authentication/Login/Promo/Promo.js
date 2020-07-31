import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { ReactComponent as LogoIcon } from './assets/logo.svg';
import BgImage from './assets/promoWindow.png';

const Background = styled.img.attrs({
  src: props => props.src
})`
  position: fixed;
  top: 0;
  bottom: 0;
  max-width: 100%;
  height: 100%;
  z-index: 1;
`;

const Logo = styled(LogoIcon)`
  position: relative;
  z-index: 5;
`;

const PromoS = styled.article`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme && theme.colors && theme.colors.primary};
`;

@observer
class Promo extends Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static get isLogoEnabled() {
    const count = process.env.REACT_APP_ENABLE_LOGO || 0;
    return count > 0;
  }

  render() {
    const { className } = this.props;

    return (
      <PromoS className={className}>
        {/* {this.isLogoEnabled && ( */}
        <Logo />
        <Background src={BgImage} />
        {/* )} */}
      </PromoS>
    );
  }
}

export default Promo;
