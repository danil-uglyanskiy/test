import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center, dl, dt, dd, ol, ul, li,
  input, textarea, fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video, button {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    background-color: transparent;
  }

  ol, ul {
    list-style: none;
  }

  s {
    text-decoration: none;
  }

  a {
    display: inline;
    text-decoration: none;
    font-size: inherit;
    color: inherit;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 8px;
    line-height: 1.3em;
    color: #4a515c;
  }
  
  body {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    background-color: #f5f6f8;
    font: 400 1.75rem HelveticaNeue, Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  #root {
    display: flex;
    flex-direction: column;
    width: 100%;
  }  

  /* HelveticaNeue */
  @font-face {
    font-family: HelveticaNeue400;
    src:
      url("../../static/fonts/HelveticalNeue/HelveticaNeueCyr-400/HelveticaNeueCyr-400.woff2") format("woff2"),
      url("../../static/fonts/HelveticalNeue/HelveticaNeueCyr-400/HelveticaNeueCyr-400.woff") format("woff");
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: HelveticaNeue500;
    src:
      url("../../static/fonts/HelveticalNeue/HelveticaNeueCyr-500/HelveticaNeueCyr-500.woff2") format("woff2"),
      url("../../static/fonts/HelveticalNeue/HelveticaNeueCyr-500/HelveticaNeueCyr-500.woff") format("woff");
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: HelveticaNeue700;
    src:
      url("../../static/fonts/HelveticalNeue/HelveticaNeueCyr-700/HelveticaNeueCyr-700.woff2") format("woff2"),
      url("../../static/fonts/HelveticalNeue/HelveticaNeueCyr-700/HelveticaNeueCyr-700.woff") format("woff");
    font-weight: 700;
    font-style: normal;
  }

  /* Roboto */
  @font-face {
    font-family: Roboto;
    src:
      url("../../static/fonts/Roboto/Roboto-400/Roboto-400.woff2") format("woff2"),
      url("../../static/fonts/Roboto/Roboto-400/Roboto-400.woff") format("woff");
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: Roboto;
    src:
      url("../../static/fonts/Roboto/Roboto-500/Roboto-500.woff2") format("woff2"),
      url("../../static/fonts/Roboto/Roboto-500/Roboto-500.woff") format("woff");
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: Roboto;
    src:
      url("../../static/fonts/Roboto/Roboto-700/Roboto-700.woff2") format("woff2"),
      url("../../static/fonts/Roboto/Roboto-700/Roboto-700.woff") format("woff");
    font-weight: 700;
    font-style: normal;
  }
`;
