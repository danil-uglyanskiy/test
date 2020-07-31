import fonts from './fonts';

const Selects = {
  primary: `

  `,
  secondary: `

  `,
  filter: `
    height: 33px;
    width: 256px;
    border-radius: 16.5px;
    background-color: #E4E9F2;
    margin-top: 0;
    padding: 0;
    border: 0;
    ${fonts.filter};
  `
};

export default (type) => {
  return Selects[type];
};