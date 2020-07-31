import styled, { css } from 'styled-components';

const Button = styled.button`
  display: flex;
  position: relative;

  & > * {
    flex-grow: 1;
  }
  
  height: 32px;
  padding: 0 28px 2px 28px;
  border-radius: 9999px;
  cursor: pointer;
  line-height: 30px;
  text-align: center;
  user-select: none;
  vertical-align: middle;

  ${({ theme }) => theme && theme.type && theme.typo.text14b};
`;

export const Primary = styled(Button)`
  ${({ theme }) => css`
    background-color: ${theme && theme.colors && theme.colors.primary};
    color: white;
  `};
`;

export const Second = styled(Button)`
  ${({ theme }) => css`
    background-color: #E5F2FF;
    color: ${theme && theme.colors && theme.colors.primary};
  `};
`;

export const Choice = styled(Button)`
  ${({ theme }) => css`
    background-color: ${theme && theme.colors && theme.colors.second};
    color: ${theme && theme.colors && theme.colors.primary};
  `}
`;

export const Outline = styled(Button)`
  ${({ theme }) => css`
    border: 1px solid ${theme && theme.colors && theme.colors.primary};
    color: ${theme && theme.colors && theme.colors.primary};
  `}
`;
