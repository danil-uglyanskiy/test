import React from 'react';
import { observer } from 'mobx-react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { Button } from 'components/forms';

const Wrapper = styled(Button)`
  height: 31px;
  padding: 0 23px;
  border-radius: 25px;
  font-weight: normal !important;
  color: #4f5660;
  background-color: transparent;
  ${({ selected }) => selected && css`
      color: #ffffff;
      background-color: #2d91ff;
  `}
`;

@observer
class Tab extends React.Component {
  static propTypes = {
    selected: PropTypes.bool,
    button: PropTypes.object
  }

  handleTabClick = () => {

  }

  render() {
    const { selected, button } = this.props;

    return (
      <Wrapper selected={selected} onClick={this.handleTabClick}>
        {button.name}
      </Wrapper>
    );
  }
}

export default styled(Tab)``;
