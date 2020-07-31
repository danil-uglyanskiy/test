import React from 'react';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ru';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import Picker from 'rc-calendar/lib/Picker';
import ru from 'rc-calendar/lib/locale/ru_RU';

import { Input } from 'components/forms';
import { Calendar as CalendarIcon, Triangle } from 'icons';
import { getPreviousMonth, getNextMonth } from 'utils/moment';

const CalendarIcn = styled(CalendarIcon)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 48px;
`;

const PrevIcon = styled(Triangle)`
  transform: rotate(90deg);
`;

const NextIcon = styled(Triangle)`
  transform: rotate(-90deg);
`;

const PrevBtn = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 32px;
  height: 41px;
  border-right: 2px solid #e7eaed;
  border-radius: 25px 0 0 25px;
  transition: all 0.2s ease-in;
  cursor: pointer;
`;

const NextBtn = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 32px;
  height: 41px;
  border-left: 2px solid #e7eaed;
  border-radius: 0 25px 25px 0;
  transition: all 0.2s ease-in;
  cursor: pointer;
`;

const DateInput = styled(Input)`
  padding: 0;
  padding: 8px 12px;
  height: 41px !important;
  border: none;
`;

const StyledCalendar = styled(MonthCalendar)`
  font-family: "Helvetica Neue", Roboto, sans-serif !important;
`;

const StyledPicker = styled(Picker)``;

const InputContainer = styled.span``;

const Wrapper = styled.div`
  position: relative;
  background-color: #ffffff;
  border: 1px solid #e7eaed; 
  border-radius: 25px;
  width: 269px;
  height: 41px;
  padding: 0 32px;
  overflow: hidden;
`;

@observer
class MonthPicker extends React.Component {

  static propTypes = {
    dateFormat: PropTypes.string,
    field: PropTypes.object,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    dateFormat: 'MMMM YYYY'
  }

  handlePrevMonthClick = () => {
    const { field, disabled } = this.props;
    if (!disabled)
      field.set(getPreviousMonth(field.value));
  }

  handleNextMonthClick = () => {
    const { field, disabled } = this.props;
    if (!disabled)
      field.set(getNextMonth(field.value));
  }

  handleSelect = (date) => {
    const { field, disabled } = this.props;
    if (!disabled) {
      if (date) {
        field.set(date);
      }
    }
  }

  @computed get formattedValue() {
    const { field, dateFormat } = this.props;

    return field && field.value
      ? moment(field.value).format(dateFormat)
      : '';
  }

  render() {
    const { field, disabled } = this.props;

    const inputProps = {
      ...field && field.bind(),
      value: this.formattedValue
    };

    const alignConfig = {
      offset: [-24, 37]
    };

    const calendar = (
      <StyledCalendar
        locale={ru}
        value={field && field.value}
        onChange={this.handleSelect}
        onSelect={this.handleSelect}
      />
    );

    return (
      <Wrapper>
        <StyledPicker
          animation='slide-up'
          calendar={calendar}
          showToday={false}
          align={alignConfig}
          dropdownClassName='month-dropdown'
        >
          {
            () => {
              return (
                <InputContainer>
                  <DateInput {...inputProps} disabled={disabled} />
                  <CalendarIcn />
                </InputContainer>
              );
            }
          }
        </StyledPicker>
        <PrevBtn onClick={this.handlePrevMonthClick}>
          <PrevIcon />
        </PrevBtn>
        <NextBtn onClick={this.handleNextMonthClick}>
          <NextIcon />
        </NextBtn>
      </Wrapper>
    );
  }
}

export default styled(MonthPicker)``;
