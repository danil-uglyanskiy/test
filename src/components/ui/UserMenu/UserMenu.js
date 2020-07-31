import React from 'react';
import PropTypes from 'prop-types';
import { computed, observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { ellipsis } from 'polished';
import styled from 'styled-components';

import {
  Triangle,
  // Notification
  // Mail,
  User
} from 'icons';
// import { SearchInput } from 'components/forms';
import { Divider } from 'components/ui';


// const Search = styled(SearchInput)`
//   margin-right: 24px;
// `;
//
// const NotificationIcn = styled(Notification)`
//   display: inline-block;
//   margin-right: 24px;
//   width: 19px;
//   height: 19px;
//   cursor: pointer;
// `;

// const MailIcn = styled(Mail)`
//   display: inline-block;
//   margin-right: 24px;
//   width: 20px;
//   height: 16px;
//   cursor: pointer;
// `;

const StyledTriangle = styled(Triangle)`
  margin-top: 3px;
`;

const UserIcon = styled(User)`
  width: 28px;
  height: 28px;
  display: inline-block;
  margin-right: 6px;
  fill: #daa8da;
`;

const AvatarGroup = styled.div`
  display: flex;
  align-items: center;
  padding: 0 35px 0 24px;
  cursor: pointer;
  height: 100%;
  
  &:hover {
    color: #1a7ce8;
  }
`;

const Name = styled.span`
  ${ellipsis(160)};
  font-size: 14px;
  font-weight: 500;
  margin-right: 6px;
`;

const UserDropdown = styled.div`
  position: absolute;
  width: 120px;
  top: 75px;
  right: 0;
  background-color: #ffffff;
  border-radius: 4px;
  z-index: 12;

  .menuItem {
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 12;
    font-size: 14px;
    color: #4F5660;
    cursor: pointer;
  }

  &:before {
    content: '';
    position: absolute;
    top: -5px;
    display: block;
    background-color: #ffffff;
    width: 15px;
    height: 15px;
    transform: translateX(55px) rotate(45deg);
    z-index: 11;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

@inject('authStore')
@observer
class UserMenu extends React.Component {
  static propTypes = {
    authStore: PropTypes.object
  }

  @observable isMenuVisible = false;

  handleToggleMenuClick = () => {
    this.isMenuVisible = !this.isMenuVisible;
  }

  handleLogoutClick = () => {
    const { authStore } = this.props;
    authStore.logout();
  }

  @computed get fullName() {
    const { user } = this.props.authStore;

    return user.fullName;
  }

  render() {
    return (
      <Wrapper>
        {/*<Search placeholder='Что вы ищете?' />*/}
        {/*<NotificationIcn />*/}
        {/*<MailIcn />*/}
        <Divider width='1px' height='19px' color='#e7eaed' />
        <AvatarGroup onClick={this.handleToggleMenuClick}>
          <UserIcon />
          <Name>
            {this.fullName}
          </Name>
          <StyledTriangle />
        </AvatarGroup>
        {this.isMenuVisible && (
          <UserDropdown>
            <span className='menuItem' onClick={this.handleLogoutClick}>Выйти</span>
          </UserDropdown>
        )}
      </Wrapper>
    );
  }
}

export default styled(UserMenu)``;
