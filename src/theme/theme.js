import { lighten, darken, opacify } from 'polished';

const colors = {
  main: {
    primary: '#2d91ff',
    secondary: '#68db88',
    ternary: '#eff3f9',
  },
  additional: {
    link: '#1a7ce8',
    danger: '#e95e5e',
    additional2: '#e9eff4',
    additional3: '#e5f2ff',
  },
  text: {
    darkest: '#4f5660',
    medium: '#747d8a',
    lightest: '#a1abb8',
  },
  black: '#000000',
  white: '#ffffff',
  placeholder: '#535458',
  border: '#e7eaed',
};


const theme = {
  global: {
    font: {
      family: 'Helvetica Neue, Roboto, sans-serif'
    },
    colors: colors,
    control: {
      border: {
        color: '#e7eaed',
        radius: '4px',
        width: '1px'
      },
      disabled: {
        opacity: 0.5
      }
    },
    active: {
      background: {
        color: colors.brand
      },
      color: {
        dark: colors.white,
        light: colors.brand
      }
    },
    focus: {
      border: {
        color: colors.main.primary,
        width: '1px',
        extend: () => `
          outline: none;
          box-shadow: none;
        `
      }
    },
    input: {
      weight: 400,
      padding: '8px'
    }
  },
  calendar: {
    day: {
      extend: ({ isSelected }) => `
        ${isSelected && `
          color: ${colors.white};
          background-color: ${colors.main.primary};
          border-radius: 50%;
          font-weight: bold;
        `}
      `
    },
    small: {
      fontSize: '12px',
      lineHeight: '1'
    },
    medium: {
      fontSize: '13px'
    },
    extend: ({ size }) => {
      let extraStyles = '';

      if (size === 'small') {
        extraStyles = `
          width: 230px;
          height: 300px;
        `;
      }
      if (size === 'medium') {
        extraStyles = `
          width: 300px;
          height: 350px;
        `;
      }
      if (size === 'large') {
        extraStyles = `
            width: 500px;
            height: 550px;
          `;
      }
      return `
        ${extraStyles}
      `;
    }
  },
  heading: {
    extend: props => {
      let extraStyles = '';
      switch (props.level) {
        case 1:
          extraStyles = `
            font-size: 24px;
            font-weight: 500;
            line-height: 29px;
          `;
          break;
        case 2:
          extraStyles = `
              font-size: 20px;
              font-weight: 500;
              line-height: 25px;
            `;
          break;
        default: break;
      }
      return `
        color: ${colors.text.darkest}
        ${extraStyles}
      `;
    }
  },
  textInput: {
    placeholder: {
      extend: () => `
      color: #535458,
      font-size: '14px',
      line-height: '16px',
      `
    },
    disabled: {
      opacity: .5
    }
  },
  button: {
    border: {
      radius: undefined,
      color: colors.main.primary
    },
    padding: {
      horizontal: '26px',
      vertical: '8px'
    },
    primary: {
      color: colors.white
    },
    extend: props => {
      let extraStyles = '';
      const height = props.height || 37;
      const borderColor = props.borderColor || colors.main.primary;
      const borderWidth = props.borderWidth || 0;
      const borderStyle = props.borderStyle || 'solid';
      const borderRadius = props.borderRadius || 0;
      const width = props.width || props.fill;
      const padding = props.padding || '0';

      switch (props.variant) {
        case 'primary':
          extraStyles = `
            background: ${colors.main.primary};
            color: ${colors.white};
            padding: 0 28px;
            height: 37px;

            &:hover {
              background: ${darken(colors.main.primary)}
            }

            &:active {
              background: ${lighten(0.1, colors.main.primary)}
            }


            &:disabled {
              background: ${opacify(0.5, colors.main.primary)}
            }
          `;
          break;
        case 'secondary':
          extraStyles = `
            background: #e5f2ff;
            color: ${colors.additional.link};


            &:hover {
              background: ${darken(0.1, '#e5f2ff')}
            }

            &:active {
              background: ${lighten(0.1, '#e5f2ff')}
            }

            &:disabled {
              background: ${opacify(0.5, '#e5f2ff')}
              pointer-events: none;
            }
          `;
          break;
        case 'danger':
          extraStyles = `
              color: ${colors.white};
              background-color: ${colors.additional.danger};
              border-color: ${colors.additional.danger};

              &:hover {
                color: ${colors.white};
                background-color: ${darken(0.1, colors.additional.danger)};
                border-color: ${darken(0.1, colors.additional.danger)};
              }

              &:active {
                color: ${colors.white};
                background-color: ${colors.additional.danger};
                border-color: ${colors.additional.danger};
              }

              &:disabled {
                background-color: ${lighten(0.1, colors.additional.danger)};
                border-color: ${lighten(0.1, colors.additional.danger)};
                pointer-events: none;
              }
            `;
          break;
        case 'outline':
          extraStyles = `
            background: transparent;
            border-color: ${colors.main.primary};
            color: ${colors.main.primary};


            &:hover {
              background: ${colors.main.primary};
              border-color: ${colors.main.primary};
              color: ${colors.white};
            }

            &:active {}

            &:disabled {
              background: transparent;
              border-color: ${opacify(0.5, colors.main.primary)};
              color: ${opacify(0.5, colors.main.primary)};
              pointer-events: none;
            }
          `;
          break;
        case 'outline-critical':
          extraStyles = `
              color: ${colors.additional.danger};
              border-color: ${colors.additional.danger};
              background-color: transparent;


              &:hover {
                color: ${colors.white};
                border-color: ${colors.additional.danger};
                background-color: ${colors.additional.danger};
              }

              &:active {
                color: ${colors.additional.danger};
                border-color: ${colors.additional.danger};
                background-color: transparent;
              }

              &:disabled {
                color: ${opacify(0.5, colors.additional.danger)};
                border-color: ${opacify(0.5, colors.additional.danger)};
                background-color: transparent;
                pointer-events: none;
              } 
            `;
          break;
        case 'flat':
          extraStyles = `
            color: ${colors.main.primary};
            border-color: transparent;
            background-color: transparent;

            &:hover {
              color: ${darken(0.1, colors.main.primary)};
              border-color: transparent;
              background-color: transparent;
            }

            &:active {
              color: ${colors.main.primary};
              border-color: transparent;
              background-color: transparent;
            }

            &:disabled {
              color: ${opacify(0.5, colors.main.primary)};
              border-color: transparent;
              background-color: transparent;
              pointer-events: none;
            }
          `;
          break;
        default: break;
      }
      return `
        display: flex;
        align-items: center;
        justify-content: center;
        padding:${padding};
        font-weight; normal;
        width: ${width};
        height: ${height}px;
        border-color: ${borderColor};
        border-style: ${borderStyle};
        border-width: ${borderWidth}px;
        border-radius: ${borderRadius}px;
        ${extraStyles};
      `;
    }
  },
  anchor: {
    'color': colors.additional.link,
    'line-height': '15px',
    extend: props => {
      const size = props.size || 13;

      return `
        font-size: ${size};
      `;
    }
  },
  layer: {
    'padding': '38px 50px',
    'background-color': colors.white
  },
  formField: {
    label: {
      size: '14px',
      color: '#747d8a',
      margin: '',
      weight: 400,
      'line-height': '16px',
      'user-select': 'none',
    },
    border: false,
    margin: ''
  },
  select: {
    control: {
      extend: () => {
        return `
          width: 100%;
          height: 37px;
        `;
      },
      options: {
        container: {
          'align': 'start',
          'pad': 'small',
          extend: () => `
            width: 140px;

            button {
              width: auto;
              padding: 0;
            }
          `
        },
        text: {
          margin: 'none',
          size: 'small',
          color: 'light-1',
        },
      }
    },
    options: {
      text: {
        'font-size': '14px',
      }
    }
  }
};

export default theme;