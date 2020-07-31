import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Select } from 'grommet';

const OptionContainer = styled.div`

`;

const Wrapper = styled.div`
    width:300px;
`;

@observer
class SingleSelect extends Component {
  static propTypes = {
    field: PropTypes.object,
    onChange: PropTypes.func,
    options: PropTypes.array
  }

  @observable data;

  handleChange = (data) => {
    const { field, onChange } = this.props;

    this.data = data.option;

    if (field) {
      field.set('value', { value: data.value });
    }

    if (onChange) {
      onChange(data);
    }
  }

  render() {
    const { options } = this.props;

    return (
      <Wrapper>
        <Select
          plain
          focusIndicator={false}
          value={this.data}
          options={options}
          onChange={this.handleChange}
          dropProps={{variant: 'filter'}}
        >
          {option => (
            <OptionContainer>{option}</OptionContainer>
          )}
        </Select>
      </Wrapper>
    );
  }
}

export default SingleSelect;
