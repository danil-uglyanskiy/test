import React from 'react';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Select } from 'grommet';
import _debounce from 'lodash/debounce';

import { Triangle } from 'icons';

import { SpecializationStore } from 'stores/SpecializationStore';

const TriangleIcn = styled(Triangle)``;

const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 300px;
  font-size: 12px;
  padding: 0 10px;
  height: inherit;
  background-color: transparent;
  white-space: normal;
  line-height: 15px;
`;

const Wrapper = styled.div`
  width: 100%;
  font-size: 14px;
  line-height: 16px;
  
  button {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    padding: 0;

    & > div {
      width: 100%;
      max-width: 100%;
      
      & > div {
        display: flex;
        justify-content: space-between;

        & > div:first-child {
          flex-grow: 1;
          
          input {
            display: block;
            padding: 8px 12px;
            
            ::placeholder {
              color: #a1abb8;
            }
          }
        }
        & > div:last-child {
          flex-grow: 1;
        }
      }
    }
  }`;

@observer
class SpecializationFilter extends React.Component {
  constructor(props) {
    super(props);

    this.specializationStore = SpecializationStore.create();
  }

  static propTypes = {
    labelKey: PropTypes.string,
    valueKey: PropTypes.string,
    icon: PropTypes.node,
    isLoading: PropTypes.bool,
    options: PropTypes.array,
    field: PropTypes.object,
    mode: PropTypes.string,
    multiple: PropTypes.bool
  }

  static defaultProps = {
    labelKey: 'label',
    valueKey: 'value',
    icon: <TriangleIcn />,
    isLoading: false,
    options: []
  };

  componentDidMount() {
    this.specializationStore.fetch();
  }

  componentWillUnmount() {
    this.specializationStore.clear();
  }

  renderChildren = (option) => {
    return <Option key={option.id} value={option.id}>{option.name}</Option>;
  }

  @computed get options() {
    return this.specializationStore.isFetched
      ? this.specializationStore.selectOptions
      : [];
  }

  onSearchHandler = _debounce((chars = "") => {
    const data = { chars };

    chars
      ? this.specializationStore.fetch({ data })
      : this.specializationStore.fetch();
  }, 500)

  onChange = ({ option }) => {
    const { field, mode } = this.props;
    const arr = [];

    if (mode === 'filter') {
      arr.push(option);
      field.set(arr);
    } else {
      field.set(option);
    }
  }


  render() {
    const { field, icon, mode } = this.props;

    return (
      <Wrapper>
        <Select
          size="small"
          icon={icon}
          mode={mode}
          focusIndicator={false}
          dropAlign={{ top: 'bottom', left: 'left', right: 'right' }}
          options={this.options}
          emptySearchMessage='Нет совпадений'
          searchPlaceholder='Название специализации'
          valueKey="id"
          labelKey="name"
          onSearch={chars => this.onSearchHandler(chars)}
          {...field && field.bind({ onChange: this.onChange })}
        >
          {this.renderChildren}
        </Select>
      </Wrapper>
    );
  }
}

export default styled(SpecializationFilter)``;
