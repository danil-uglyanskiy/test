import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import styled from 'styled-components';

const Wrapper = styled.div``;

@observer
class Text extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    message: PropTypes.object.isRequired
  }

  render() {
    const { message: { text }, ...rest } = this.props;

    return (
      <Wrapper {...rest}>
        {text}
      </Wrapper>
    );
  }
}

export default styled(Text)``;
