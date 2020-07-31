import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import stylePropType from "react-style-proptype";
import { Input } from "components/forms";
import { fieldPropType } from "types/react-prop-types";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; 
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: inherit;
`;

const Label = styled.label`
  display: flex;
  font-size: 14px;
  ${({ theme }) => theme && theme.label}
  width: inherit;
`;

const Tip = styled(Link)`
  ${({ theme }) => theme && theme.typo && theme.typo.link}
`;

const InputComponent = styled(Input)`
  width: inherit; 
  margin-top: 11px !important;

  ${({ theme }) =>
    theme &&
    theme.colors &&
    css`
      border: 1px solid ${theme.colors.form.field.border};
    `};
`;

@observer
class InputWithTitle extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    field: PropTypes.shape(fieldPropType),
    style: stylePropType,
    t: PropTypes.func,
    tip: PropTypes.shape({
      text: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  };

  render() {
    const { className, style, field, t, tip } = this.props;

    return (
      <Wrapper className={className} style={style}>
        <LabelContainer>
          <Label htmlFor={field.id}>{t(field.label)}</Label>
          {tip && <Tip to={tip.url}>{tip.text}</Tip>}
        </LabelContainer>
        <InputComponent field={field} />
      </Wrapper>
    );
  }
}

export default withTranslation()(InputWithTitle);
