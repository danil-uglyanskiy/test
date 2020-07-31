import React from 'react';
import PropTypes from 'prop-types';
import { Provider, observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import styled from 'styled-components';

const Wrapper = styled.div``;

@observer
class Form extends React.Component {
  static propTypes = {
    children: PropTypes.any
  }

  render() {
    const { children } = this.props;

    return (
      <Provider>
        <Wrapper>
          {children}
        </Wrapper>
      </Provider>
    );
  }
}

export default withTranslation()(Form);
