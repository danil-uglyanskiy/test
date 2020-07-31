import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import colors from 'theme/colors';

const variantStyles = (variant) => {
  if (variant === 'dark') {
    return css`
      color: ${colors.light.primary};

      :hover {
        color: ${colors.control.secondary};
      }
    `;
  }

  return css`
    color: ${colors.button.primary.default};

    :hover {
      color: ${colors.text.primary};
    }
  `;
};

const Wrapper = styled.a`
  ${({ variant }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 12px 16px;
    transition: color 0.25s;
    word-break: break-word;
    ${variantStyles(variant)}
  `}
`;

class Download extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    href: PropTypes.string.isRequired,
    download: PropTypes.string,
    variant: PropTypes.oneOf(['light', 'dark'])
  }

  static defaultProps = {
    variant: 'light'
  }

  render() {
    const { children, className, href, download, variant } = this.props;

    return (
      <Wrapper
        className={className}
        href={href}
        download={download}
        variant={variant}
      >
        {children}
      </Wrapper>
    );
  }
}

export default styled(Download)``;
