import React from 'react';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Select } from 'grommet';

import _debounce from 'lodash/debounce';

import { Triangle } from 'icons';

import { EducationStore } from './stores';

const options = [
  {
    id: '5cf65ae0de0912004223d478',
    title: "Первый-МГМУ-им-И-М-Сеченова",
    from_date: "2010-01-01",
    to_date: "2015-06-30"
  },
  {
    id: '5cf65ae0de0912004223d479',
    title: "РНИМУ имени Н.И. Пирогова",
    from_date: "2010-01-01",
    to_date: "2015-06-30"
  },
  {
    id: '5cf65ae0de0912004223d480',
    title: "МГМСУ",
    from_date: "2010-01-01",
    to_date: "2015-06-30"
  },
];

const Option = styled.option`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  font-size: 12px;
  padding: 0 10px;
  background-color: transparent;
`;

const TriangleIcn = styled(Triangle)``;

const Wrapper = styled.div`
font-size: 14px;
  line-height: 16px;
  
  button {
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
class EducationFilter extends React.Component {
  constructor(props) {
    super(props);

    this.educationStore = EducationStore.create();
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

  @computed get options() {
    return this.educationStore.isFetched
      ? this.educationStore.selectOptions
      : [];
  }

  onSearchHandler = _debounce((chars = "") => {
    const data = { chars };

    chars
      ? this.educationStore.fetch({ data })
      : this.educationStore.fetch();
  }, 200)


  render() {
    const { field, icon } = this.props;

    return (
      <Wrapper>
        <Select
          size="small"
          icon={icon}
          options={options}
          valueKey="id"
          labelKey="title"
          {...field.bind({ onChange: this.onChange })}
          onSearch={chars => this.onSearchHandler(chars)}
        >
          {(option) => (
            <Option key={option.id} value={option.id}>{option.title}</Option>
          )}
        </Select>
      </Wrapper>
    );
  }
}

export default styled(EducationFilter)``;
