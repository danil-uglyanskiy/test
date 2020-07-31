import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import styled from 'styled-components';
import Qs from 'qs';

import { Container, PageControl, PageItems, PageItem } from '.';

import { display } from 'theme/mixins';
import { observer } from 'mobx-react';

const Wrapper = styled.div`
  ${display('flex', 'center', 'center')}
  padding: 32px 0;
`;

function pagination(currentPage, pageCount) {
  let delta = 2;
  let result = [];
  const left = currentPage - delta;
  const right = currentPage + delta + 1;

  const dots = {
    isLink: false,
    value: '...'
  };

  const lastElement = {
    isLink: true,
    value: pageCount
  };

  const firstElement = {
    isLink: true,
    value: 1
  };

  result = Array.from({ length: pageCount }, (_, k) => k + 1)
    .filter(index => index && index >= left && index < right);
  
  result = result.map(element => ({
    isLink: true,
    value: element
  }));

  result[0]?.value !== 1 && result.splice(0, 1, firstElement, dots);

  const { length } = result;

  result[length - 1].value !== pageCount && result.splice(length - 1, 1, dots, lastElement);

  return result;
}

@withRouter
@observer
class Pagination extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    location: ReactRouterPropTypes.location,
    total: PropTypes.number.isRequired,
    onChange: PropTypes.func
  };

  render() {
    const { total, location, onChange, ...rest } = this.props;

    const qs = Qs.parse(location.search, { ignoreQueryPrefix: true });
    const current = qs.page ? Number(qs.page) : 1;

    let paginationElements = [];
    
    if (total > 1) {
      paginationElements = pagination(current, total);
    }

    const prevLink = current > 1 && total > 1
      ? `${location.pathname}?${Qs.stringify({ ...qs, page: current - 1 })}`
      : null;

    const nextLink = current < total
      ? `${location.pathname}?${Qs.stringify({ ...qs, page: current + 1 })}`
      : null;

    const paginationPages = paginationElements.map((element, index) => (
      <PageItem
        element={element}
        key={index}
        isActive={element.value === current}
        fetch={onChange}
      />
    ));

    if (total > 1) {
      return (
        <Wrapper {...rest}>
          <Container>
            <PageControl
              disabled={!prevLink}
              direction='left'
              link={prevLink}
              fetch={onChange}
              current={current - 1}
            />

            <PageItems>
              {paginationPages}
            </PageItems>

            <PageControl
              disabled={!nextLink}
              direction='right'
              link={nextLink}
              fetch={onChange}
              current={current + 1}
            />
          </Container>
        </Wrapper>
      );
    }

    return null;
  }
}

export default styled(Pagination)``;
