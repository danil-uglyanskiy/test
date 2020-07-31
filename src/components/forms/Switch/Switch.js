import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { css } from 'styled-components';
import { Grommet, CheckBox } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const checkboxCheckStyle = css`
  background-color: #2196f3;
  border-color: #2196f3;

  &:checked + span > span  {
      left: calc( 30px - 20px );
    }
`;

const customSwitchTheme = {
  global: {
    colors: {
      "toggle-bg": "#56aa6d",
      "toggle-knob": "#68db88",
      "toggle-accent": "accent-2"
    }
  },
  checkBox: {
    border: {
      color: {
        light: "toggle-bg"
      }
    },
    color: {
      light: "toggle-knob"
    },
    check: {
      radius: "2px"
    },
    hover: {
      border: {
        color: undefined
      }
    },
    toggle: {
      background: { light: "toggle-bg" },
      color: {
        light: "toggle-knob"
      },
      size: "30px",
      knob: {
        extend: ({ checked }) => `
          top: -5px;
          box-shadow: none;
          width: 19px;
          height: 19px;
          ${checked && `
            &:checked + span > span  {
              left: calc( 30px - 20px );
            }
          `}
        `
      },
      extend: ({ checked, focus }) => `
        ${focus && `
          box-shadow: none;
          border-color: #56aa6d;
        `}
        outline: none;
        box-shadow: none;
        height: 13px;
        ${checked && checkboxCheckStyle}
      `
    },
    gap: "small",
    size: "20px"
  }
};

@observer
class Switch extends React.Component {
  static propTypes = {
    field: PropTypes.object,
    reverse: PropTypes.bool,
    onChange: PropTypes.func,
    checked: PropTypes.bool
  }

  render() {
    const { field, reverse, onChange, checked, ...rest } = this.props;

    return (
      <Grommet theme={deepMerge(grommet, customSwitchTheme)}>
        <CheckBox
          label={field.label}
          toggle
          reverse={reverse}
          {...field && field.bind({ onChange: onChange, checked: checked })}
          {...rest}
        />
      </Grommet>
    );
  }
}

export default Switch;
