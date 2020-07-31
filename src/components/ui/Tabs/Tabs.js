import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { action } from 'mobx';

import Tab from './Tab';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width:100%;
  border: 1px solid #E7EAED;
  height: 41px;
  background-color: #ffffff;
  border-radius: 25px;
  padding: 5px;
  ${({type}) => type === 'secondary' && css`
    background: #EFF3F9;
    padding: 0;
    ${Tab} {
      border-radius: 0;
      &:nth-child(1){
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
      }
      &:nth-last-child(1){
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
      }
    }
  `}
`;

@observer
class Tabs extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    items: PropTypes.array,
    type: PropTypes.string
  }

  static defaultProps = {
    items: []
  }

  @action
  handleTabClick = (id) => {
    const { onChange, value } = this.props;
    if (value !== id) {
      onChange && onChange(id);
    }
  }

  render() {
    const { items, value, type } = this.props;
    const listItems = items.map(item =>
      (
        <Tab
          key={item.id}
          item={item}
          typeTab={type}
          onChange={this.handleTabClick}
          selected={item.id === value}
        />
      )
    );
    const { ...rest } = this.props;
    return (
      <Wrapper {...rest}>
        {listItems}
      </Wrapper>
    );

  }
}

export default styled(Tabs)``;
