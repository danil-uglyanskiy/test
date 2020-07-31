import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Input, Form } from 'components/forms';
import styled from 'styled-components';

import { PolicyForm } from './forms';
import { Field } from 'components/ui';

const Wrapper = styled(Form)``;


@observer
class PolicyFilter extends React.Component {
  static propTypes = {
    filter: PropTypes.shape({
      label: PropTypes.string,
      type: PropTypes.string,
    }).isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const hooks = {
      onSuccess: this.handleSuccess,
      onError: this.handleError
    };

    this.form = new PolicyForm({}, { hooks });
  }

  handleError = (form) => {
    console.log(form.errors());
  }

  handleSuccess = (form) => {
    const {
      filter: {
        label,
        type,
      },
      onSubmit
    } = this.props;
    const { value } = form.$(type);

    onSubmit({
      type,
      value,
      label: `${label}: ${value}`
    });
  }

  render() {
    const { filter } = this.props;

    return (
      <Wrapper form={this.form}>
        <Field
          component={Input}
          field={this.form.$(filter.type)}
        />
      </Wrapper>
    );
  }
}

export default PolicyFilter;