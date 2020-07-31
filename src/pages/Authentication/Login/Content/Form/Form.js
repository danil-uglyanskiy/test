import React from "react";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import styled from "styled-components";
import { Button , InputWithTitle } from "components/forms";


const InputWithTitleS = styled(InputWithTitle)``;

const ButtonS = styled(Button)`
  height: 52px;
  padding-left: 54px;
  padding-right: 54px;
`;

const FormS = styled.form`
  display: flex;
  flex-direction: column;
  padding: 24px 0;

  ${InputWithTitleS} + ${InputWithTitleS} {
    margin-top: 30px;
  }

  ${ButtonS} {
    margin-top: 28px;
    align-self: center;
  }
`;

@inject("form")
@observer
class Form extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    form: PropTypes.any,
    t: PropTypes.func
  };

  handleSubmit = (e) => {
    const { form } = this.props;
    form.onSubmit(e);
  }

  render() {
    const { className, form, t } = this.props;

    return (
      <FormS className={className}>
        <InputWithTitleS
          field={form.$("email")}
          title={form.$("email").label}
        />
        <InputWithTitleS
          field={form.$("password")}
          title={form.$("password").label}
        />
        <ButtonS onClick={this.handleSubmit} kind="second">
          {t("Form.Submit")}
        </ButtonS>
      </FormS>
    );
  }
}

export default withTranslation()(Form);
