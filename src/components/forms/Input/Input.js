import React from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { setDisplayName } from 'recompose';
import styled, { css } from 'styled-components';

import { TextInput } from 'grommet';

import { typography } from 'theme/mixins';
import colors from 'theme/colors';

export const variations = {
  regular: {
    default: {
      color: colors.text.primary,
      background: 'transparent',
      borderColor: colors.popup.primary,
      placeholderColor: colors.text.disabled
    },
    focused: {
      color: colors.text.primary,
      borderColor: colors.active.secondary,
      placeholderColor: colors.text.disabled
    },
    disabled: {
      color: colors.text.primary,
      background: 'transparent',
      borderColor: colors.popup.primary,
      placeholderColor: colors.text.disabled
    },
    success: {
      color: colors.text.primary,
      background: 'transparent',
      borderColor: colors.success.primary,
      placeholderColor: colors.text.disabled
    },
    warning: {
      color: colors.text.primary,
      background: 'transparent',
      borderColor: colors.error.secondary,
      placeholderColor: colors.text.disabled
    },
    error: {
      color: colors.text.primary,
      background: 'transparent',
      borderColor: colors.error.primary,
      placeholderColor: colors.text.disabled
    }
  }
};

const variation = state => (p) => {
  const values = variations[p.variation] && variations[p.variation][state]
    ? variations[p.variation][state]
    : null;

  return values && css`
    color: ${values.color};
    background: ${values.background};
    border: 1px solid ${values.borderColor};

    ::placeholder {
      color: ${values.placeholderColor};
    }
  `;
};

const Wrapper = styled(TextInput)`
  ${({ disabled, error, status }) => css`
    &&& {
      &,
      div,
      input {
        height: 35px;
        font-size: 14px;
        color: ${disabled ? '#935458' : '#535458'};
        box-shadow: none;
        line-height: 16px;
        

        ::placeholder {
          color: #a1abb8;
          font-size: 14px;
          line-height: 16px;
        }
        ${error && css`
          border-color: #e95e5e;
        `}
      }

      input {
        height: 37px;

        ${typography(13, 15, 400)};

        ${(!disabled && status) && variation(status)}
        ${disabled && variation('disabled')}
        ${(!disabled && !status) && variation('default')}

        :focus {
          ${variation('focused')};
        }
      }
    }
  `}
`;

@setDisplayName('Input')
@observer
class Input extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    type: PropTypes.oneOf([
      'email',
      'number',
      'password',
      'tel',
      'text',
      'url',
      'time',
      'date'
    ]),
    size: PropTypes.oneOf(['small', 'medium']),
    variation: PropTypes.oneOf(['regular', 'awesome', 'promo']),
    name: PropTypes.string,
    status: PropTypes.oneOf(['error', 'warning', 'success', null]),
    isFocused: PropTypes.bool,
    inputClassName: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyUp: PropTypes.func,
    onKeyDown: PropTypes.func,
    iconLeft: PropTypes.node,
    iconRight: PropTypes.node,
    field: PropTypes.object,
    theme: PropTypes.object
  };

  static defaultProps = {
    className: '',
    size: 'medium',
    variation: 'regular',
    inputClassName: '',
    iconLeft: null,
    iconRight: null
  };

  @computed get hasError() {
    const { field } = this.props;
    return field && field.error;
  }

  render() {
    const { field, theme, disabled, ...rest } = this.props;
    
    return (
      <Wrapper
        theme={theme}
        disabled={disabled}
        error={this.hasError ? 1 : 0}
        {...field && field.bind()}
        {...rest}
      />
    );
  }
}

export default styled(Input)``;
