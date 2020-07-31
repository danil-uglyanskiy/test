import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import { FormField } from 'grommet';

const input = styled.input``;

const ErrorField = styled.span`
  display: block;
  padding-top: 1px;
  position: absolute;
  color: #E95E5E;
  font-size: 12px;
  line-height: 1;
`;

const FieldLabel = styled.label`
  display: block;
  margin-bottom: 9px;
  color: #747d8a;
  font-size: 14px;
  line-height: 16px;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

@observer
class Field extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    field: PropTypes.object,
    name: PropTypes.string,
    noLabel: PropTypes.bool
  };

  static defaultProps = {
    className: '',
    component: input
  };

  render() {
    const { className, field, component, noLabel, ...rest } = this.props;

    if (field) {
      const Component = component;

      return (
        <Wrapper className={className}>
          {noLabel ? null : <FieldLabel htmlFor={field.id}>{field.label}</FieldLabel>}
          <FormField
            id={field.id}
          >
            <Component
              {...rest}
              field={field}
            />
          </FormField>
          {field.hasError ? <ErrorField>{field.error}</ErrorField> : null}
        </Wrapper>
      );
    }

    return null;
  }
}

export default styled(Field)``;
