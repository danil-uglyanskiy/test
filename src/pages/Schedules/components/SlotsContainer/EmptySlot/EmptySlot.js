import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';

import { Danger } from 'icons';
import { calculateSlotWidth, calculateSlotOffset } from 'pages/Schedules/utils/Schedule';

const DangerIcon = styled(Danger)`
  width: 26px;
  height: 26px;
  border-radius: 50%;
`;

const TextContainer = styled.span`
  color: #E95E5E;
  font-size: 18px;
  line-height: 22px;
  margin-left: 10px;
`;

const EmptySlotContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #F2E6E4;;
  border-radius: 4px;
  position: absolute;
  padding: ${props => props.width < 50 ? '0' : '12px'};
  border: 2px solid #eff3f9;
  width: ${props => props.width || 50}px;
  left: ${ props => props.offset || 4}px;
  height: 54px;
`;

@withTranslation()
@observer
class EmptySlot extends React.Component {
  static propTypes = {
    slot: PropTypes.object,
    day: PropTypes.string,
    isWeekend: PropTypes.bool,
    t: PropTypes.func,
    className: PropTypes.string
  }

  static defaultProps = {
    className: ''
  }

  render() {
    const { slot, day, isWeekend, t, className } = this.props;

    const width = calculateSlotWidth(slot);
    const offset = calculateSlotOffset(slot, day);

    const showIcon = width >= 50;
    const showText = width >= 85;

    const text = width >= 150
      ? t('SchedulesForm.Doctors.Empty')
      : t('UI.Not');

    return (
      <Wrapper
        width={width}
        offset={offset}
        isWeekend={isWeekend}
        className={className}
      >
        <EmptySlotContainer>
          {showIcon && <DangerIcon />}

          {showText && (
            <TextContainer>
              {text}
            </TextContainer>
          )}
        </EmptySlotContainer>
      </Wrapper>
    );
  }

}

export default styled(EmptySlot)``;