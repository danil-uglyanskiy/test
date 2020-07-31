import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

export const variants = {
  available: {
    color: '#68db88',
    backgroundColor: 'transparent',
    borderColor: '#68db88'
  },
  unavailable: {
    color: '#e95e5e',
    backgroundColor: 'transparent',
    borderColor: '#e95e5e'
  },
  away: {
    color: '#dbbc68',
    backgroundColor: 'transparent',
    borderColor: '#dbbc68'
  }
};

const variant = p => {
  const values = variants[p.type]
    ? variants[p.type]
    : null;

  return (
    values && css`
      color: ${values.color};
      background: ${values.backgroundColor};
      bodre: ${values.borderColor}

      span {
        color: ${values.color};
      }
    `
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 34px;
  border-radius: 19px;
  padding: 0 10px;
`;

class DoctorStatus extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    status: PropTypes.string
  }

  static defaultProps = {
    text: 'Доступен',
    status: variant
  }

  render() {
    const { text, status } = this.props;

    return (
      <Wrapper className={status}>
        {text}
      </Wrapper>
    );
  }
}

export default styled(DoctorStatus)``;
