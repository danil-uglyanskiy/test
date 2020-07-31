import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { CheckCircle } from 'icons';

const CheckIcon = styled(CheckCircle)`
  position: absolute;
  bottom: 7px;
  right: 7px;
  width: 12px;
  height: 12px;
`;

const AppointmentsCount = styled.span`
  position: absolute;
  top: 15px;
  left: 12px;
  font-size: 19px;
  line-height:24px;
  font-weight: bold;
`;

const Wrapper = styled.div`
  position: relative;
  width: 62px;
  height: 53px;
  border: 1px solid #cdd3da;
  color: #A1ABB8;
  border-radius: 4px;
  background-color: #ffffff;
  cursor: pointer;

  ${({ active }) => active && css`
    color: #747D8A;
  `}

  ${({ selected }) => selected && css`
    color: #FFF;
    background-color: #2D91FF;
`}
  }
`;



@inject('appointmentsState')
@observer
class AppointmentsInfo extends React.Component {
  static propTypes = {
    day: PropTypes.number,
    appointmentsState: PropTypes.object,
    selected: PropTypes.bool,
    active: PropTypes.bool
  }

  @computed get appointmentsCount() {
    const { day, appointmentsState } = this.props;

    return appointmentsState.getSlotsByDay(day + 1);
  }

  handleAppoinetmentClick = () => {
    const { day, appointmentsState } = this.props;
    
    appointmentsState.toggleSelectedDate(day + 1);
  }

  render() {
    const { active, selected } = this.props;

    return (
      <Wrapper
        selected={selected}
        active={active}
        onClick={this.handleAppoinetmentClick}
      >
        <AppointmentsCount>
          {this.appointmentsCount}
        </AppointmentsCount>
        {!active && <CheckIcon />}
      </Wrapper>
    );
  }
}

export default AppointmentsInfo;