import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';

import { ReactComponent as CloseSvg } from 'icons/close.svg';
import { FilterPicker } from './FilterPicker';

const Close = styled(CloseSvg)`
  width: 32px;
  height: 32px;
`;

const FilterInput = styled.div`
  position: relative;
  margin: 4px 28px 4px 4px;

  ${Close} {
    position: absolute;
    right: -32px;
    top: 60%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

@inject('filterState')
@observer
class FiltersControls extends Component {

  static propTypes = {
    items: PropTypes.array,
    filterState: PropTypes.object
  }

  @observable filter = null;

  handleChangeFilter = (filter) => {
    this.filter = filter;
  }

  handleFilterCancel = () => {
    this.filter = null;
  }

  handleFilterAdd = (filter) => {
    const { filterState } = this.props;

    filterState.addFilter(filter);
    this.filter = null;
  }

  @computed get selectedTypeCodes() {
    return this.props.filterState.$('filters').value.map(filter => filter.type);
  }

  @computed get currentItems() {
    const { items } = this.props;

    return items.filter(item => (
      !(item.unique && this.selectedTypeCodes.includes(item.type))
    ));
  }

  get renderComponent() {
    const Component = this.filter.component;

    return (
      <Component
        filter={this.filter}
        onSubmit={this.handleFilterAdd}
      />
    );
  }

  render() {
    return (
      this.filter ?
        (
          <FilterInput>
            {this.renderComponent}

            <Close onClick={this.handleFilterCancel} />
          </FilterInput>
        )
        : (
          <FilterPicker
            onChange={this.handleChangeFilter}
            items={this.currentItems}
          />
        )
    );
  }
}

export default FiltersControls;