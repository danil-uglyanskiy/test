import React from 'react';
import { Link , withRouter } from 'react-router-dom';
import { computed } from 'mobx';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Qs from 'qs';

import { display } from 'theme/mixins';

const Wrapper = styled(Link)`
  ${({ active }) => css`
    ${display('flex', 'center', 'center')}
    height: 27px;
    width: 27px;
    margin: 0 4px;
    cursor: pointer;
    transition: color 0.25s;
    color: #747D8A;
    font-size: 13px;
    font-weight: 500;
    line-height: 16px;

    ${active && css`
      border-radius: 50%;
      border: 1px solid #E7EAED;
      color: #1A7CE8;	
      background-color: #FFFFFF;
    `}
  `}
`;

@withRouter
class PageItem extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    isActive: PropTypes.bool,
    location: PropTypes.object,
    element: PropTypes.object,
    fetch: PropTypes.func,
    staticContext: PropTypes.object
  };

  handleClick = (e) => {
    const { element, fetch, isActive } = this.props;
    const { isLink } = element;

    !isLink && e.preventDefault();

    !isActive && fetch(element.value);
  };

  @computed get link() {
    const { location, element } = this.props;
    const { value } = element;
    const qs = Qs.parse(location.search, { ignoreQueryPrefix: true });

    return `${location.pathname}?${Qs.stringify({ ...qs, page: value })}`;
  }

  render() {
    const { isActive, element, fetch, staticContext, ...rest } = this.props;

    return (
      <Wrapper
        {...rest}
        active={isActive ? 1 : 0}
        to={this.link}
        onClick={this.handleClick}
      >
        {element.value}
      </Wrapper>
    );
  }
}

export default styled(PageItem)``;
