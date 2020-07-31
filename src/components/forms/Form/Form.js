import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'mobx-react';
import styled from 'styled-components';

import { ReactComponentChildrenPropType } from 'types/customPropTypes';

const Wrapper = styled.form``;

class Form extends React.PureComponent {

  static propTypes = {
    children: ReactComponentChildrenPropType.isRequired,
    className: PropTypes.string,
    form: PropTypes.object.isRequired
  }

  render() {
    const { children, form, ...rest } = this.props;
    const { onSubmit, onReset } = form;

    return (
      <Wrapper
        {...{ ...rest, onSubmit, onReset }}
      >
        <Provider form={form}>
          <>{children}</>
        </Provider>
      </Wrapper>
    );
  }
}

export default styled(Form)``;
