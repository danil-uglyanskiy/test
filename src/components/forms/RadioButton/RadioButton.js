import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { RadioButton as GrommetRadioButton } from 'grommet/components/RadioButton';

@observer
class RadioButton extends React.Component {
static propTypes = {
  className: PropTypes.string,
  field: PropTypes.object
}

render() {
  const { className, field, ...rest } = this.props;
  return (
    <GrommetRadioButton
      {...rest}
      className={className}
      {...(field && field.bind())}
    />
  );
}
}

export default styled(RadioButton)``;
