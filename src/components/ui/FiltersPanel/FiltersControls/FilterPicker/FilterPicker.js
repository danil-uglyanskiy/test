import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';

import { Button } from 'components/forms';
import { Plus2 } from 'icons';
import { FilterOptions } from './FilterOptions';

const Wrapper = styled.div`
  position: relative;
`;

const AddFilterBtn = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2D91FF !important;
  border: 1px solid #2d91ff !important;
  width: 33px !important;
  height: 33px !important;
  padding: 0 !important;
  outline: none;
  box-shadow: none;
  border-radius: 50%;

  & svg {
    width: 11px;
    height: 11px;
    fill: #FFFFFF;
  }
`;

@observer
class FilterPicker extends React.Component {

  static propTypes = {
    items: PropTypes.array,
    onChange: PropTypes.func
  }

  @observable mouseEntered = false
  @observable isOpened = false

  @action
  handleMouse = (value) => () => {
    this.mouseEntered = value;
  }

  @action
  handleToggleOpened = () => {
    this.isOpened = !this.isOpened;
  }

  handleOnClickOption = (filter) => {
    const { onChange } = this.props;

    onChange(filter);
  }

  handleOnBlur = () => {
    !this.mouseEntered && this.handleToggleOpened();
  }

  render() {
    const { items } = this.props;

    if(!items.length) {
      return null;
    }

    return(
      <Wrapper>
        <AddFilterBtn
          onMouseEnter={this.handleMouse(true)}
          onMouseLeave={this.handleMouse(false)}
          onClick={this.handleToggleOpened}
        >
          <Plus2 />
        </AddFilterBtn>
        {this.isOpened && (
          <FilterOptions
            items={items}
            onBlur={this.handleOnBlur}
            onChange={this.handleOnClickOption}
          />
        )}
      </Wrapper>
    );
  }
}

export default FilterPicker;