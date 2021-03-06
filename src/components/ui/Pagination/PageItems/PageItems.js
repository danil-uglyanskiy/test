import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ReactComponentChildrenPropType } from 'types/customPropTypes';

import { display } from 'theme/mixins';

const Wrapper = styled.div`
  ${display('flex', 'center')}
  height: 32px;
  padding: 0 8px;
`;

class PageItems extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: ReactComponentChildrenPropType
  }

  render() {
    const { children, ...rest } = this.props;

    return (
      <Wrapper {...rest}>
        {children}
      </Wrapper>
    );
  }
}

export default styled(PageItems)``;
