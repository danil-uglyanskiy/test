import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ru';
import Picker from 'rc-calendar/lib/Picker';
import Calendar from 'rc-calendar';
import { lighten } from 'polished';
import 'rc-calendar/assets/index.css';

import { ru } from './ru';
import { Calendar as CalendarIcon, Cancel as ClearIcon, Triangle } from 'icons';
import { Input } from 'components/forms';

const TriangleIcn = styled(Triangle)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  flex-grow: 1;
  flex-shrink: 0;
`;

const InputClearIcn = styled(ClearIcon)`
  position: absolute;
  top: 50%;
  right: 25px;
  transform: translateY(-50%);
  cursor: pointer;
`;

const ClearIcn = styled(ClearIcon)`
  flex-grow: 1;
  flex-shrink: 0;
  margin-right: 3px;
`;

const DateInput = styled(Input)`
  padding: 0;
  height: auto;
  border: 1px solid #e7eaed;
  padding: 8px 12px;
`;

const InputContainer = styled.span`
  position: relative;
`;

const ReactCalendar = styled(Calendar)`
  border: none !important;
  width: 100%;

  .rc-calendar-column-header-inner {
    color: #a1abb8;
    font-weight: bold !important;
    text-transform: capitalize; 
  }

  .rc-calendar-month-select,
  .rc-calendar-year-select {
    color: #2d91ff;

    &:hover {
      color: ${lighten(0.1, '#2d91ff')}
    }
  }

  .rc-calendar-panel {
    font-family: 'Helvetica Neue', Roboto, sans-serif;
  }

  .rc-calendar-input-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
      display: inline-block;
      width: 15px;
      height: 15px;
      cursor: pointer;
    }

    &:after {
      content: none;
      clear: none;
    }
  }

  .rc-calendar-date {
    border-radius: 50%;

    &[aria-selected=true] {
      background-color: #2D91FF;
      border-color: #2D91FF;
      color: #ffffff;

      &:hover {
        background-color: ${lighten(0.1, '#2D91FF')};
        border-color: ${lighten(0.1, '#2D91FF')};
        color: #ffffff;
      }
    }
  }
`;

const Wrapper = styled(Picker)`
  border: ${props => `1px solid ${props.error ? '' : ''}`};
`;

@observer
class DatePicker extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    overlayClassName: PropTypes.string,
    overlayStyle: PropTypes.object,
    isOpened: PropTypes.bool,
    onOpen: PropTypes.func,
    field: PropTypes.object,
    inputFormat: PropTypes.string,
    onClose: PropTypes.func,
    onRequestClose: PropTypes.func,
    closeOnClickOutside: PropTypes.bool,
    contentPointX: PropTypes.oneOf(['left', 'right', 'center']),
    anchorPointX: PropTypes.oneOf(['left', 'right', 'center']),
    contentPointY: PropTypes.oneOf(['top', 'bottom', 'center']),
    anchorPointY: PropTypes.oneOf(['top', 'bottom', 'center']),
    autoPositionY: PropTypes.bool,
    anchorFullWidth: PropTypes.bool,
    appendToBody: PropTypes.bool,
    padding: PropTypes.any,
    tabIndex: PropTypes.number,
    showArrow: PropTypes.bool,
    visibleMonths: PropTypes.number,
    variation: PropTypes.oneOf(['service', 'media']),
    value: PropTypes.oneOfType([
      PropTypes.arrayOf(Date),
      PropTypes.instanceOf(Date)
    ]),
    initDate: PropTypes.instanceOf(Date),
    today: PropTypes.instanceOf(Date),
    range: PropTypes.bool,
    minYear: PropTypes.number,
    maxYear: PropTypes.number,
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),
    showYear: PropTypes.bool,
    showMonthSwitch: PropTypes.bool,
    highlightWeekend: PropTypes.bool,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    dateFormatter: PropTypes.func,
    icon: PropTypes.node,
    clearIcon: PropTypes.bool
  };

  static defaultProps = {
    className: '',
    closeOnClickOutside: true,
    contentPointX: 'left',
    anchorPointX: 'left',
    contentPointY: 'top',
    anchorPointY: 'bottom',
    autoPositionY: true,
    appendToBody: true,
    visibleMonths: 1,
    variation: 'service',
    range: false,
    minYear: 1900,
    maxYear: 2200,
    showYear: true,
    showMonthSwitch: true,
    highlightWeekend: false,
    onChange: () => null,
    icon: <CalendarIcon />,
    clearIcon: true,
    inputFormat: 'DD.MM.YYYY'
  };

  @computed get formattedValue() {
    const { field, inputFormat } = this.props;

    return field.value
      ? moment(field.value).format(inputFormat)
      : '';
  }

  @computed get hasError() {
    const { field } = this.props;

    return field && field.error ? true : false;
  }

  handleSelect = (date) => {
    const { field } = this.props;

    if (date) {
      field.set(date.format('YYYY-MM-DD'));
    }
    else {
      this.handleClear();
    }

  }

  handleClear = () => {
    const { field } = this.props;

    field.reset();
  }

  render() {
    const { field } = this.props;

    const inputProps = {
      ...field && field.bind(),
      value: this.formattedValue
    };

    const alignConfig = {
      offset: [0, 36]
    };

    const calendar = (
      <ReactCalendar
        locale={ru}
        dateInputPlaceholder='Укажите дату'
        clearIcon={<ClearIcn />}
        showToday={false}
        value={field.value ? moment(field.value) : moment()}
        onSelect={this.handleSelect}
        onChange={this.handleSelect}
        onClear={this.handleClear}
      />
    );

    return (
      <Wrapper
        className='date-picker'
        animation="slide-up"
        calendar={calendar}
        value={field.value ? moment(field.value) : moment()}
        align={alignConfig}
        error={this.hasError ? true : false}
        dropdownClassName='calendar-dropdown'
      >
        {
          () => {
            return (
              <InputContainer>
                <DateInput {...inputProps} />
                {field.value && <InputClearIcn onClick={this.handleClear} />}
                <TriangleIcn />
              </InputContainer>
            );
          }
        }
      </Wrapper>
    );
  }
}

export default styled(DatePicker)``;
