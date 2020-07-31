import React, { Component } from 'react';
import styled from 'styled-components';

import { display } from 'theme/mixins';

const weekDays = [
  { id: 1, name: 'Пн' },
  { id: 2, name: 'Вт' },
  { id: 3, name: 'Ср' },
  { id: 4, name: 'Чт' },
  { id: 5, name: 'Пт' },
  { id: 6, name: 'Сб' },
  { id: 7, name: 'Вс' },
];

const WeekDay = styled.div`
  display: flex;
  align-items: center;
  font-size: 10px;
  text-transform: uppercase;
  padding: 0 43px;
  height: 15px;
  &:not(:last-child) {
    border-right: 2px solid #e7eaed;
  }
`;

const Wrapper = styled.div`
  ${display('flex', 'center', 'space-betweeb')};
  height: 44px;
  background-color: #ffffff;
  border-radius: 4px;
  border: 1px solid #e7eaed;
  width: 100%;
  pointer-events: none;
`;

class TableHeading extends Component {

  render() {
    const listItems = weekDays.map(day => <WeekDay key={day.id}>{day.name}</WeekDay>);

    return (
      <Wrapper>
        {listItems}
      </Wrapper>
    );
  }
}

export default styled(TableHeading)``;
