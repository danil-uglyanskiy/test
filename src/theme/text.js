import { css } from 'styled-components';
import theme from './index';

export default css`
  article {
    h1 {
      color: ${theme.typography.h1.color};
      font-family: ${theme.typography.h1.fontFamily};
      font-size: ${theme.typography.h1.fontSize}px;
      font-weight: ${theme.typography.h1.fontWeight};
      line-height: ${theme.typography.h1.lineHeight}px;

      :not(:first-child) {
        margin-top: 8px;
      }
    }

    h2 {
      font-family: ${theme.typography.h2.fontFamily};
      font-size: ${theme.typography.h2.fontSize}px;
      font-weight: ${theme.typography.h2.fontWeight};
      line-height: ${theme.typography.h2.lineHeight}px;

      :not(:first-child) {
        margin-top: 4px;
      }
    }

    h3 {
      font-family: ${theme.typography.h3.fontFamily};
      font-size: ${theme.typography.h3.fontSize}px;
      font-weight: ${theme.typography.h3.fontWeight};
      line-height: ${theme.typography.h3.lineHeight}px;

      :not(:first-child) {
        margin-top: 2px;
      }
    }

    p {
      margin-top: 8px;
      margin-bottom: 8px;
      font-size: ${theme.typography.p.fontSize}px;
      line-height: ${theme.typography.p.lineHeight}px;
    }

    li {
      margin-top: 8px;
      margin-bottom: 8px;
    }

    ul {
      list-style-position: inside;

      li::before {
        content: "·";
        margin-right: 8px;
      }
    }

    > section:not(:first-child) {
      margin-top: 16px;
    }
  }
`;
