import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { Logo } from 'components/ui';

const links = [
  { key: 1, name: 'Консультации', to: '/appointments' },
  { key: 2, name: 'Расписание', to: '/schedules' },
  { key: 3, name: 'Врачи', to: '/doctors' },
  { key: 4, name: 'Пациенты', to: '/patients' },
  // { key: 5, name: 'Рассылка', to: 'mailing' }
];

const Link = styled(NavLink)`
  display: flex;
  align-items: center;
  position: relative;
  height: inherit;
  color: #4f5660;	
  font-size: 14px;	
  font-weight: 500;	
  line-height: 17px;
  padding: 0 20px;
  overflow: hidden;

  &:first-child {
    padding-left: 27px;
  }

  &:hover {
    color: #1a7ce8;
    background-color: #f5faff;
  }

  &.active {
    color: #1a7ce8;

    &:before  {
      content: '';
      display: block;
      position: absolute;
      left: 50%;
      right: 1px;
      bottom: 3px;
      width: 40px;
      height: 4px;
      background-color: #2d91ff;
      border-radius: 4px;
      transform: translateX(-50%);
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

class HeaderNav extends React.PureComponent {
  render() {

    const listItems = links.map(link => (
      <Link
        key={link.key}
        to={link.to}
        activeClassName='active'
      >
        {link.name}
      </Link>
    ));

    return (
      <Wrapper>
        <Logo />
        {listItems}
      </Wrapper>
    );
  }
}

export default styled(HeaderNav)``;
