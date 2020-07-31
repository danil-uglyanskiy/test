import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import stylePropType from 'react-style-proptype';
import Form from './Form';

const FormS = styled(Form)``;

const LinkS = styled(Link)`
  ${({ theme }) => theme && theme.type && theme.typo.link}
`;

const ContentS = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  position: relative;
  z-index: 10;
`;

const TitleS = styled.h2`
  display: flex;
  font-size: 30px;
`;

const SubTitleS = styled.h3`
  display: flex;
  font-size: 16px;
`;

const MainContainerS = styled.main`
  display: flex;
  flex-direction: column;
  margin: auto 0;

  ${SubTitleS} + ${FormS} {
    margin-top: 30px;
  }

  ${TitleS} + ${SubTitleS} {
    margin-top: 10px;
  }
`;

const Terms = styled.aside`
  display: inline;
  padding-bottom: 4px;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
`;

@observer
class Content extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: stylePropType,
  }

  render() {
    const { className, style } = this.props;

    return (
      <ContentS
        className={className}
        style={style}
      >
        <MainContainerS>
          <TitleS>
            Войти в личный кабинет
          </TitleS>
          <SubTitleS>
            Введите данные для входа
          </SubTitleS>
          <FormS />
        </MainContainerS>
        <Terms>
          При входе, вы принимаете условия
          {' '}
          <LinkS to="/foo">
            Пользовательского соглашения
          </LinkS>
          <br />
          и
          {' '}
          <LinkS to="/bar">
            Политики конфедициальности
          </LinkS>
        </Terms>
      </ContentS>
    );
  }
}

export default Content;
