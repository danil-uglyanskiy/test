import React from 'react';
import PropTypes from 'prop-types';
import { observer, Provider } from 'mobx-react';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';

import ChatState from './state';

import Body from './Body';

const Underline = styled.div`
  display: flex;
  height: 1px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;

  ${Body} {
    flex-grow: 1;
  }
`;

@observer
class Chat extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    conversation: PropTypes.object.isRequired,
    hideControl: PropTypes.bool,
    t: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    const { conversation } = props;

    this.chatState = new ChatState(conversation);
  }

  render() {
    const { t, ...rest } = this.props;

    return (
      <Provider chatState={this.chatState}>
        <Wrapper
          {...rest}
        >
          <Body />

          <Underline />

        </Wrapper>
      </Provider>
    );
  }
}

export default styled(withTranslation()(Chat))``;
