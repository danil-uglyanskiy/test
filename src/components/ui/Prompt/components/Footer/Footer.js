import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ReactComponentChildrenPropType } from 'types/customPropTypes';

const Wrapper = styled.div`
    padding: 32px;
    background: #EFF3F9;
    border-radius: 0 0 inherit inherit;
`;

class Footer extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: ReactComponentChildrenPropType.isRequired,
    theme: PropTypes.object
  };

  static defaultProps = {
    className: ''
  };

  render() {
    const { children, ...rest } = this.props;

    return (
      <Wrapper {...rest}>
        {children}
      </Wrapper>
    );
  }
}

export default styled(Footer)``;
