import React from 'react';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import { Select as GrommetSelect } from 'grommet';
import { Triangle } from 'icons';

const TriangleIcn = styled(Triangle)``;

const StyledSelect = styled(GrommetSelect)``;

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
  }
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 203px;
  font-size: 12px;
  padding: 0 10px;
  height: inherit;
  background-color: transparent;
  white-space: normal;
  line-height: 15px;
`;

@observer
class Select extends React.Component {
  onChange = ({ option }) => {
    const { field, onChange } = this.props;

    if (onChange) {
      return onChange(option);
    }

    option ? field.set(option) : field.clear();
  };

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  @computed get hasError() {
    const { field, valueKey } = this.props;

    return field && field.has(valueKey) && !!field.$(valueKey).error;
  }

  inputValueRenderer = (value) => {
    const { labelKey } = this.props;
    return value && value[labelKey];
  };

  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.shape({
      label: PropTypes.node.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }),
    field: PropTypes.object.isRequired,
    items: PropTypes.array,
    style: PropTypes.object,
    dropdownClassName: PropTypes.string,
    dropdownStyle: PropTypes.string,
    menuClassName: PropTypes.string,
    menuStyle: PropTypes.object,
    multiple: PropTypes.bool,
    multipleType: PropTypes.oneOf(['regular', 'background']),
    clearIcon: PropTypes.bool,
    valuesEquality: PropTypes.func,
    iconElementRenderer: PropTypes.func,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    icon: PropTypes.node,
    arrowIcon: PropTypes.node,
    size: PropTypes.oneOf(['small', 'medium']),
    variation: PropTypes.oneOf(['regular', 'awesome', 'promo']),
    status: PropTypes.oneOf(['error', 'warning', 'success', 'filled', null]),
    appendToBody: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onSearch: PropTypes.func,
    customElementRenderer: PropTypes.func,
    rootClassName: PropTypes.string,
    rootStyle: PropTypes.object,
    containerClassName: PropTypes.string,
    containerStyle: PropTypes.object,
    inputMode: PropTypes.bool,
    native: PropTypes.bool,
    labelKey: PropTypes.string,
    valueKey: PropTypes.string,
    isLoading: PropTypes.bool,
    theme: PropTypes.object
  };

  static defaultProps = {
    labelKey: 'label',
    valueKey: 'value',
    items: [],
    icon: <TriangleIcn />,
    isLoading: false
  };

  renderOption = (option) => {
    const { labelKey, valueKey } = this.props;

    const label = option[labelKey];
    const value = option[valueKey];

    return (
      <Option
        key={value}
        value={option}
      >
        {label}
      </Option>
    );
  }

  render() {
    const {
      items,
      field,
      labelKey,
      valueKey,
      icon,
      isLoading,
      theme,
      ...rest
    } = this.props;

    return (
      <Wrapper
        onKeyDown={this.handleKeyDown}
        hasError={this.hasError}
      >
        <StyledSelect
          {...rest}
          icon={icon}
          inputValueRenderer={this.inputValueRenderer}
          options={items}
          emptySearchMessage='Нет вариантов'
          {...field.bind({ onChange: this.onChange })}
        >
          {this.renderOption}
        </StyledSelect>
      </Wrapper>
    );
  }
}

export default styled(Select)``;
