import styled from 'styled-components';

export const Billet = styled.div`
  width: calc(33% - 4rem);
  min-width: 40rem;
  padding: 3rem;
  background: #ffffff;
  box-shadow: 0 0 8px 0px rgba(0, 0, 0, 0.125);
  border-radius: 4px;

  &:not(:first-child) {
    margin-left: 2rem;
  }

  &:not(:last-child) {
    margin-right: 2rem;
  }
`;

export const Billets = styled.div`
  display: flex;
`;
