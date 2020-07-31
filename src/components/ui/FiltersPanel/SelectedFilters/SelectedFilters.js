import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx';
import PropTypes from 'prop-types';

import FilterChips from 'components/ui/FilterChips';

@inject('filterState')
@observer
class SelectedFilters extends Component {

  static propTypes = {
    filterState: PropTypes.object
  }

  @computed get filters() {
    const { filterState } = this.props;

    return Array.from(filterState.$('filters').fields.values());
  }

  handleFilterRemove = (filter) => () => {
    const { filterState } = this.props;
    filterState.removeFilter(filter);
  }

  render() {
    return (
      this.filters.map((filter, index) => {
        const [label, value] = filter.value.label.split(': ');

        return (
          <FilterChips
            key={index}
            onRemove={this.handleFilterRemove(filter)}
          >
            {label}: {value}
          </FilterChips>
        );
      })
    );
  }
}

export default SelectedFilters;