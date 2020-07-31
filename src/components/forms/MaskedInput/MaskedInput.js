import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import { MaskedInput as Input } from 'grommet';


const Wrapper = styled(Input)`
  height: 35px;
  font-size: 14px;
  color: #535458;
  box-shadow: none;
  line-height: 16px;

  ::placeholder {
    color: #a1abb8;
  }
`;

@observer
class MaskedInput extends React.Component {
  static propTypes = {
    field: PropTypes.object
  }
  
  render() {
    const { field, ...rest } = this.props;
    const { mask } = field.extra;

    return (
      <Wrapper
        mask={mask}
        {...field.bind()}
        {...rest}
      />
    );
  }
}

export default MaskedInput;
