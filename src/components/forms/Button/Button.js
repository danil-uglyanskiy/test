import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { lighten, darken } from 'polished';

import { Button as GrommetButton } from 'grommet';

import { typography, transition } from 'theme/mixins';
import { ReactComponentChildrenPropType } from 'types/customPropTypes';
import colors from 'theme/colors';

export const variants = {
  primary: {
    default: {
      color: colors.light,
      borderColor: colors.button.primary,
      backgroundColor: colors.button.primary,
    },
    hover: {
      color: colors.light,
      borderColor: darken(0.1, colors.button.primary),
      backgroundColor: darken(0.1, colors.button.primary)
    },
    active: {
      color: colors.light,
      borderColor: colors.button.primaryActive,
      backgroundColor: colors.button.primaryActive
    },
    disabled: {
      color: colors.light,
      borderColor: lighten(0.1, colors.button.primaryDisabled),
      backgroundColor: lighten(0.1, colors.button.primaryDisabled)
    }
  },
  secondary: {
    default: {
      color: colors.text.primary,
      borderColor: '#e4e8ee',
      backgroundColor: '#e4e8ee'
    },
    hover: {
      borderColor: colors.popup.primary,
      backgroundColor: colors.popup.primary
    },
    active: {
      color: colors.text.primary,
      borderColor: colors.popup.primary,
      backgroundColor: colors.popup.primary
    },
    disabled: {
      color: colors.light,
      borderColor: colors.button.primaryDisabled,
      backgroundColor: colors.button.primaryDisabled
    }
  },
  danger: {
    default: {
      color: colors.light,
      borderColor: colors.error.primary,
      backgroundColor: colors.error.primary
    },
    hover: {
      borderColor: colors.error.primary,
      backgroundColor: colors.error.primary
    },
    active: {
      color: colors.light,
      borderColor: colors.error.primary,
      backgroundColor: colors.error.primary
    },
    disabled: {
      color: colors.light,
      borderColor: colors.button.primaryDisabled,
      backgroundColor: colors.button.primaryDisabled
    }
  },
  outline: {
    default: {
      color: colors.button.primary,
      borderColor: colors.button.primary,
      backgroundColor: 'transparent'
    },
    hover: {
      color: darken(0.1, colors.button.primary),
      borderColor: darken(0.1, colors.button.primary),
      backgroundColor: 'transparent'
    },
    active: {
      color: colors.button.primaryActive,
      borderColor: colors.button.primaryActive,
      backgroundColor: 'transparent'
    },
    disabled: {
      color: colors.active.primary,
      borderColor: colors.active.primary,
      backgroundColor: 'transparent'
    }
  },
  'outline-critical': {
    default: {
      color: colors.error.primary,
      borderColor: colors.error.primary,
      backgroundColor: 'transparent'
    },
    hover: {
      borderColor: colors.error.primary,
      backgroundColor: 'transparent'
    },
    active: {
      color: colors.error.primary,
      borderColor: colors.error.primary,
      backgroundColor: 'transparent'
    },
    disabled: {
      color: colors.error.primary,
      borderColor: colors.button.primaryDisabled,
      backgroundColor: 'transparent'
    }
  },
  flat: {
    default: {
      color: colors.button.flat,
      borderColor: 'transparent',
      backgroundColor: 'transparent'
    },
    hover: {
      color: darken(0.1, colors.button.flat),
      borderColor: 'transparent',
      backgroundColor: 'transparent'
    },
    active: {
      color: colors.button.primaryActive,
      borderColor: 'transparent',
      backgroundColor: 'transparent'
    },
    disabled: {
      color: colors.button.primaryDisabled,
      borderColor: 'transparent',
      backgroundColor: 'transparent'
    }
  }
};

const variant = state => (p) => {
  const values = variants[p.type] && variants[p.type][state]
    ? variants[p.type][state]
    : null;

  return (
    values && css`
      color: ${values.color};
      background: ${values.backgroundColor};

      span {
        color: ${values.color};
      }

      &::after,
      &&::before {
        border: 1px solid ${values.borderColor};
      }
    `
  );
};

const Wrapper = styled(GrommetButton)`
  ${({ disabled, rounded }) => css`
    &&& {
      border: none;
      outline: none;
      ${transition()};
      text-transform: none;
      letter-spacing: 0;
      ${typography(13, 16, 500)};

      ${rounded && css`
        &,
        ::after,
        ::before {
          border-radius: ${rounded ? 9999 : 4}px;
        }
      `};

      ${disabled
      ? variant('disabled')
      : css`
          ${variant('default')};

          &:hover {
            ${variant('hover')};
          }

          &:active {
            ${variant('active')};
          }
        `}
    }
  `}
`;

class Button extends React.PureComponent {
  static propTypes = {
    children: ReactComponentChildrenPropType.isRequired,
    className: PropTypes.string,
    variant: PropTypes.oneOf(Object.keys(variants)),
    href: PropTypes.string,
    target: PropTypes.string,
    icon: PropTypes.node,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    size: PropTypes.oneOf(['small', 'medium']),
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    loading: PropTypes.bool,
    rounded: PropTypes.bool
  };

  static defaultProps = {
    className: '',
    variant: 'primary',
    href: '',
    target: '_self',
    icon: null,
    iconPosition: 'left',
    size: 'medium',
    onClick: () => null,
    disabled: false,
    type: 'button',
    loading: undefined,
    rounded: false
  };

  render() {
    const {
      children,
      variant,
      type,
      ...rest
    } = this.props;

    return (
      <Wrapper {...{ ...rest, variant, type }}>
        {children}
      </Wrapper>
    );
  }
}

export default styled(Button)``;
