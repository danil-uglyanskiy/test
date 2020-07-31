import getSelectStyle from './selects';
import colors from './colors';
import fonts from './fonts';

const grommetTheme = {
  heading: {
    extend: props => {
      let extraStyles = '';
      let color = colors.text.primary;
      switch (props.level) {
        case 1:
          extraStyles = fonts.h1;
          break;
        case 2:
          extraStyles = fonts.h2;
          break;
      }
      props.textColor && (color = colors.text[props.textColor]);
      return `
          ${extraStyles}
          color: ${color}
        `;
    }
  },

};

export default grommetTheme;
