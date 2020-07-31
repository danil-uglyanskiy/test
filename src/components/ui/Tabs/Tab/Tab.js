import React from 'react';
import { observer } from 'mobx-react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { Button } from 'components/forms';

const Wrapper = styled(Button)`
  height: 31px;
  padding: 0 23px;
  width:100%;
  text-align:center;
  border-radius: 25px;
  color: #4F5660;	
  font-size: 13px;
  white-space: nowrap;
  line-height: 15px;	
  font-weight: normal !important;
  background-color: transparent;
  box-shadow: none;
  ${({ selected }) => selected && css`
    color: #ffffff;
    background-color: #2d91ff;
  `}
  ${({ selected, typeTab }) => selected && (typeTab === 'secondary') && css`
    background-color: #68DB88;
    height:41px;
    font-weight: 500 !important;
  `}
  ${({ disabled }) => disabled && css`
    background:#eff3f9 !important;
  `}
`;

@observer
class Tab extends React.Component {
  static propTypes = {
    selected: PropTypes.bool,
    item: PropTypes.object,
    onChange: PropTypes.func
  }

  handleTabClick = () => {
    const { onChange, item } = this.props;

    !item.disabled && onChange && onChange(item.id);
  }

  render() {
    const { selected, item, ...rest } = this.props;

    return (
      <Wrapper
        {...rest}
        selected={selected}
        onClick={this.handleTabClick}
        disabled={item.disabled}
      >
        {item.name}
      </Wrapper>
    );
  }
}

export default styled(Tab)``;
