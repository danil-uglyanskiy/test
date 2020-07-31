import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import styled from 'styled-components';

import { OwnMessage, TheirMessage } from './styles';

import { Attachment, Text } from '.';

@observer
class Message extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(['own', 'their']),
    message: PropTypes.object.isRequired,
    className: PropTypes.string
  }

  getMsgComponent = (type) => {
    switch (type) {
      case 'own':
        return OwnMessage;

      case 'their':
        return TheirMessage;

      default:
        return OwnMessage;
    }
  }

  render() {
    const { type, message, className } = this.props;

    const MessageComponent = this.getMsgComponent(type);

    return (
      <MessageComponent
        className={className}
        isAttachment={message.attachments?.length > 0}
      >
        {message.attachments?.length > 0
          ? (
            <Attachment
              message={message}
              type={type}
            />
          )
          : <Text message={message} />}
      </MessageComponent>
    );
  }
}

export default styled(Message)``;
