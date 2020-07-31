import styled, { css } from 'styled-components';

const Message = styled.div`
  ${({ isAttachment }) => css`
    display: flex;
    flex-shrink: 0;
    max-width: 467px;
    margin-top: 20px;
    border: 1px solid #E7EAED;
    overflow: hidden;
    white-space: pre-wrap;

    ${!isAttachment && css`
      padding: 12px 16px;
    `}
  `}

  & + & {
    margin-top: 10px;
  };

  &:first-of-type {
    margin-top: auto;
  }
`;

export const OwnMessage = styled(Message)`
  align-self: flex-end;
  color: #4F5660;
  border-radius: 14px 0 14px 14px;
  background-color: #EFF3F9;
`;

export const TheirMessage = styled(Message)`
  align-self: flex-start;
  color: #FFFFFF;
  border-radius: 0 14px 14px 14px;
  background-color: #2D91FF;
`;
