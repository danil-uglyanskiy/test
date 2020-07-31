import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ReactComponentChildrenPropType } from 'types/customPropTypes';

import { typography } from 'theme/mixins';

const Wrapper = styled.div`
  padding: 10px 0;
  ${typography(20, 24, 700)}
`;

class Content extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: ReactComponentChildrenPropType.isRequired
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

export default styled(Content)``;
