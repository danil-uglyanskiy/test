import React from 'react';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Select } from 'grommet';
import { darken } from 'polished';
import _debounce from 'lodash/debounce';

import { Triangle, User } from 'icons';
import { Image } from 'components/ui';

import { shortName } from 'utils/names';

import { DoctorsStore } from './stores';

const SelectedOption = styled.span`
  display: inline-block;
  padding-left: 10px;
  color: #ffffff;
`;

const TriangleIcon = styled(Triangle)`
  width: 11px;
  height: 5px;

  path {
    fill: #ffffff;
  }
`;

const AvatarIcn = styled(User)`
  display: inline-block;
  margin-right: 10px;
  width: 28px;
  height: 28px;
  fill: ${darken(0.2, '#dff0fe')};
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  font-size: 12px;
  padding: 0 10px;
  background-color: transparent;
  white-space: normal;
  line-height: 1;

  .avatar {
    display: inline-block;
    margin-right: 10px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }
  
  .fio {
    line-height: 1;
  }

  .specialization {
    font-size: 10px;
    color: #a1abb8;
    line-height: 1;
  }
`;

const Wrapper = styled.div`
  background-color: #2d91ff;
  border-radius: 4px;
  width: 277px;
  height: 36px;

  font-size: 14px;
  line-height: 16px;
  justify-content: flex-start;
  
  button {
    padding: 0;
    width: 100%;
    border: none;

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
            padding: 8px 0 8px 12px;
            width: 100%;
            color: #ffffff;
            
            ::placeholder {
              color: #ffffff;
              font-size: 13px;
              font-weight: 500;
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

@observer
class DoctorsFilter extends React.Component {
  constructor(props) {
    super(props);

    this.doctorsStore = DoctorsStore.create();
  }

  static propTypes = {
    labelKey: PropTypes.string,
    valueKey: PropTypes.string,
    icon: PropTypes.node,
    isLoading: PropTypes.bool,
    options: PropTypes.array,
    field: PropTypes.object,
    mode: PropTypes.string
  }

  static defaultProps = {
    labelKey: 'label',
    valueKey: 'value',
    icon: <TriangleIcon />,
    isLoading: false,
    options: []
  };

  componentDidMount() {
    this.doctorsStore.fetch();
  }

  componentWillUnmount() {
    this.doctorsStore.clear();
  }

  renderChildren = (option) => {
    return (
      <Option key={option.id} value={option.id}>
        {option.avatar ?
          <Image
            url={option.avatar && option.avatar.image_urls.thumb}
            className='avatar'
          />
          : <AvatarIcn />}
        <div>
          <div className='fio'>{shortName(option)}</div>
          <div className='specialization'>
            {option.specializations.map(spec => spec.name).join(', ')}
          </div>
        </div>
      </Option>
    );
  }

  @computed get options() {
    return this.doctorsStore.isFetched
      ? this.doctorsStore.selectOptions
      : [];
  }

  onSearchHandler = _debounce((chars = "") => {
    const data = { chars };

    chars
      ? this.doctorsStore.fetch({ data })
      : this.doctorsStore.fetch();
  }, 500);

  onChange = ({ option }) => {
    const { field, mode } = this.props;
    const arr = [];

    if (mode === 'filter') {
      arr.push(option);
      field.set(option);
    } else {
      field.set(option);
    }
  }

  renderValue = (value) => {
    const { field } = this.props;

    return (
      <SelectedOption>
        {value.last_name !== '' ? shortName(value) : field.placeholder}
      </SelectedOption>
    );
  }

  render() {
    const { field, icon, mode } = this.props;

    return (
      <Wrapper>
        <Select
          icon={icon}
          mode={mode}
          focusIndicator={false}
          dropAlign={{ top: 'bottom', left: 'left', right: 'right' }}
          options={this.options}
          value={field.value}
          emptySearchMessage='Нет совпадений'
          searchPlaceholder='ФИО врача'
          valueKey="id"
          labelKey="last_name"
          valueLabel={field.value && this.renderValue(field.value)}
          onSearch={chars => this.onSearchHandler(chars)}
          {...field && field.bind({ onChange: this.onChange })}
        >
          {this.renderChildren}
        </Select>
      </Wrapper>
    );
  }
}

export default styled(DoctorsFilter)``;
