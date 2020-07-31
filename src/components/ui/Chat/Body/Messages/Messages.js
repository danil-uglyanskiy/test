import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { reaction, toJS } from 'mobx';
import styled from 'styled-components';
import { debounce } from "lodash";

import { Message } from '.';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 4px 26px;
  overflow: auto;
`;

@inject('chatState')
@observer
class Messages extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    chatState: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.contentEl = React.createRef();
  }

  componentDidMount() {
    const { chatState } = this.props;

    this._handleScroll = reaction(
      () => chatState.messages.size,
      () => this.scrollToBottom(),
      { fireImmediately: true }
    );
  }

  componentWillUnmount() {
    this._handleScroll();
  }

  //TODO change debounce to reaction, that observe to Wrapper size
  scrollToBottom = debounce(() => {
    if (!this.contentEl.current)
      return;

    const scrollHeight = this.contentEl.current.scrollHeight;

    this.contentEl.current.scroll({
      top: scrollHeight,
      behavior: 'smooth'
    });
  }, 1000)

  render() {
    const {
      chatState: { members, messages },
      ...rest
    } = this.props;

    const listMessages = Object.values(toJS(messages)).map(m => {
      const type = m.from.id === members[0].id ? 'own' : 'their';

      return (
        <Message
          key={m.id}
          type={type}
          message={m}
        />
      );
    });

    return (
      <Wrapper
        ref={this.contentEl}
        {...rest}
      >
        {listMessages}
      </Wrapper>
    );
  }
}

export default styled(Messages)``;
