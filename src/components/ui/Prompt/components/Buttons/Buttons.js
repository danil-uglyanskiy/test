import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ReactComponentChildrenPropType } from 'types/customPropTypes';

import { display } from 'theme/mixins';

const Wrapper = styled.div`
  ${display('flex', 'center', 'center')}
  flex-wrap: wrap;

  > *:not(:first-child) {
    margin-left: 8px;
  }

  > *:not(:last-child) {
    margin-right: 8px;
  }
`;

class Buttons extends React.PureComponent {
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

export default styled(Buttons)``;
