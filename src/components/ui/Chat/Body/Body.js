import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import Messages from "./Messages";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  overflow-y: auto;

  ${Messages} {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%
  }
`;

@inject('chatState')
@observer
class ChatScreen extends Component {
  static propTypes = {
    className: PropTypes.string,
    chatState: PropTypes.object.isRequired
  }

  render() {
    const { chatState, ...rest } = this.props;

    return (
      <Wrapper {...rest}>
        <Messages />
      </Wrapper>
    );
  }
}

export default styled(ChatScreen)``;
