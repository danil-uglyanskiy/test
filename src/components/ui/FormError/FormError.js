import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { display, typography } from 'theme/mixins';
import { Error as ErrorIcon } from 'icons';

const Wrapper = styled.div`
  ${({ theme }) => css`
    ${display('flex', 'center', 'center')}

    padding: 8px;
    color: ${theme.colors.danger};
    ${typography(13, 16)}
  
    :not(:first-child) {
      margin-top: 8px;
    }
  
    ${ErrorIcon} {
      margin-right: 4px;
    }
  `}
`;

class FormError extends React.PureComponent {
  static propTypes = {
    error: PropTypes.string
  };

  static defaultProps = {
    error: null
  };

  render() {
    const { error } = this.props;

    return (
      <Wrapper>
        <ErrorIcon />
        <span>
          {error}
        </span>
      </Wrapper>
    );
  }
}

export default styled(FormError)``;
