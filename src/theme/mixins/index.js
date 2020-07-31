import { css } from 'styled-components';

export const typography = (
  size,
  height,
  weight = 400,
  important = false
) => css`
  font-size: ${size}px ${important && ' !important'};
  font-weight: ${weight} ${important && ' !important'};
  line-height: ${height}px ${important && ' !important'};
`;

export const transition = (
  property = 'all',
  timing = '.2s',
  easing = 'ease-in-out',
  delay = ''
) => css`
  transition: ${property} ${timing} ${easing} ${delay};
`;

export const flexCenter = () => css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const flexCenterBetween = () => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const display = (
  display,
  alignItems = null,
  justifyContent = null
) => css`
  display: ${display};

  ${alignItems && css`
    align-items: ${alignItems};
  `};

  ${justifyContent && css`
    justify-content: ${justifyContent};
  `};
`;

export const flexChildActualWidth = width => css`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: ${typeof width === 'number' ? `${width}px` : width};
`;
