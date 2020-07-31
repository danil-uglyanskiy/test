import React from 'react';
import styled from 'styled-components';

import { Divider } from 'components/ui';
import { Triangle } from 'icons';

const TriangleIcon = styled(Triangle)`
  width: 15px;
  height: 7px;

  path {
    fill: #4f5660;
  }
`;

const SelectFromSaved = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  color: #4f5660;
  margin-left: auto;
  margin-right: 12px;
  cursor: pointer;

  span {
    display: inline-block;
    margin: 0 12px 0 16px;

  }
`;

const Heading = styled.span`
  display: inline-block;
  margin-left: 22px;
  color: #1a7ce8;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 68px;
  background-color: #ffffff;
  border: 1px solid #e7eaed;
  border-radius: 4px;
  margin-bottom: 30px;
`;

class FiltersPanel extends React.Component {
  render() {
    return (
      <Wrapper>
        <Heading>Фильтры</Heading>
        <SelectFromSaved>
          <Divider width='1px' height='38px' color='#e7eaed' />
          <span>Выбрать из сохраненного</span>
          <TriangleIcon />
        </SelectFromSaved>
      </Wrapper>
    );
  }
}

export default styled(FiltersPanel)``;
