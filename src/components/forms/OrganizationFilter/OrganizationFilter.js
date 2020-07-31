import React from 'react';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Select } from 'grommet';
import _debounce from 'lodash/debounce';

import { Triangle } from 'icons';

import { OrganizationStore } from './stores';

const TriangleIcn = styled(Triangle)``;

const Option = styled.option`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  font-size: 12px;
  padding: 0 10px;
  background-color: transparent;
  white-space: normal;
  line-height: 1;
`;

const Wrapper = styled.div`
  width:100%;
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
class OrganizationFilter extends React.Component {
  constructor(props) {
    super(props);

    this.organizationStore = OrganizationStore.create();
  }

  static propTypes = {
    labelKey: PropTypes.string,
    valueKey: PropTypes.string,
    icon: PropTypes.node,
    isLoading: PropTypes.bool,
    options: PropTypes.array,
    field: PropTypes.object
  }

  static defaultProps = {
    labelKey: 'label',
    valueKey: 'value',
    icon: <TriangleIcn />,
    isLoading: false,
    options: []
  };

  componentDidMount() {
    this.organizationStore.fetch();
  }

  renderChildren = (option, index, options, state) => {
    return <Option key={option.id} value={option.id}>{option.title}</Option>;
  }

  @computed get options() {
    return this.organizationStore.isFetched
      ? this.organizationStore.selectOptions
      : [];
  }

  onSearchHandler = _debounce((chars = "") => {
    const data = { chars };

    chars
      ? this.organizationStore.fetch({ data })
      : this.organizationStore.fetch();
  }, 500);

  onChange = ({ option }) => {
    const { field } = this.props;

    field.set(option);
  }


  render() {
    const { field, icon } = this.props;

    return (
      <Wrapper>
        <Select
          size="small"
          icon={icon}
          focusIndicator={false}
          options={this.options}
          dropAlign={{ top: 'bottom', left: 'left', right: 'right' }}
          emptySearchMessage='Нет совпадений'
          searchPlaceholder='Название организации'
          valueKey="id"
          labelKey="title"
          onSearch={chars => this.onSearchHandler(chars)}
          {...field.bind({ onChange: this.onChange })}
        >
          {this.renderChildren}
        </Select>
      </Wrapper>
    );
  }
}

export default styled(OrganizationFilter)``;
