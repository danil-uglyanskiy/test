import React from 'react';
import styled, { css } from "styled-components";
import PropTypes from 'prop-types';
import { observer, inject, Provider } from 'mobx-react';
import { computed } from 'mobx';
import { withTranslation } from 'react-i18next';

import { Triangle, Ellipsis } from 'icons';
import SlotState from './state/SlotState';
import Dropdown from './Dropdown';

const Range = styled.div`
  position: absolute;
  width: min-content;
  height: 100%;
  user-select: none;
  transform: translateX(${props => props.offset || 0}px);
  width: ${props => props.width || 0}px;
  z-index: 1;
  ${Dropdown}{
    margin-top: 10px;
  }
  ${({ opened }) => opened && css`
    z-index: 2;
  `}
`;

const TriangleIcon = styled(Triangle)`
  transform: rotate(0deg);
  width: 10px;
  fill: #2D91FF !important;
  ${({ opened }) => opened && css`
    transform: rotate(180deg);
  `}
`;

const OpenDurationContainer = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
`;

const ConsultationContainer = styled.span`
  width:25px;
  height:25px;
  background: #2D91FF;
  display:inline-flex;
  align-items:center;
  justify-content: center;
  color: #fff;
  font-size:18px;
  line-height:22px;
  border-radius:50%;
`;

const TriangleOpenDurationIcon = styled(Ellipsis)`
  width:13px;
  height:15px;
  fill: blue !important;
  cursor: pointer;
`;

const DurationContainer = styled.span`
  font-size: 12px;
  line-height: 14px;
  width:100%;
  color: #1A7CE8;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-left:10px;
  overflow:hidden;
`;

const DetailContainer = styled.div`
  justify-self: flex-end;
  cursor: pointer;
  white-space: nowrap;
`;

const SlotElementsContainer = styled.div`
  justify-content: space-between;
  border-radius: 4px;
  padding: 14px;
  box-sizing: border-box;
  border-radius: 4px;
  position: relative;
  background: #cee7ff;
  border-top: 2px solid #2d91ff;
  border-bottom: 2px solid #2d91ff;
  display: flex;
  width:100%;
  position: relative;
  height:100%;
  :after {
    content: attr(data-duration);
    position:absolute;
    color: #ffffff;
    font-size: 10px;
    font-weight: 500;
    line-height: 12px;
    white-space: nowrap;
    display: none;
    width:200%;
    left:-50%;
    text-align:center;
    top:calc(100% + 27px);
  }
  :before {
    content: attr(title);
    color: #1a7ce8;
    font-size: 18px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  };
  ${({ hasTitle }) => !hasTitle && css`
    padding: 5px;
    :before, :after{
      display:none;
    }
    &:hover:before{
      content: attr(title);
      display: block;
      position:absolute;
      top:calc(100% + 15px);
      color: #ffffff;
      overflow:inherit;
      font-size: 10px;
      font-weight: 500;
      line-height: 12px;
      width:200%;
      left:-50%;
      text-overflow: unset;
      text-align:center;
    }
    &:hover:after{
      display: block;
    }
  `};
  align-items: center;
`;

@withTranslation()
@inject('dailySlotsState', 'dayTrackState')
@observer
class Slot extends React.Component {
  static propTypes = {
    dailySlotsState: PropTypes.object,
    index: PropTypes.number,
    children: PropTypes.any,
    slot: PropTypes.object,
    t: PropTypes.func,
    dayTrackState: PropTypes.object
  }

  constructor(props) {
    super(props);

    const { dailySlotsState, index, dayTrackState } = props;
    this.slotState = new SlotState(dailySlotsState, index, dayTrackState);
  }

  componentDidMount() {
    this.slotState.initReaction();
  }
  componentWillUnmount() {
    this.slotState.dispose();
  }

  @computed get hasTitle() {
    return this.slotState.width > 100;
  }

  @computed get duration() {
    const { t } = this.props;

    return `${this.slotState.duration} ${t('UI.Time.Min')}`;
  }

  handleOpenConsultation = () => {
    this.slotState.handleToggleByType('consultation');
  }

  handleOpenDuration = () => {
    this.slotState.handleToggleByType('duration');
  }

  handleToggle = () => {
    this.slotState.handleToggle('duration');
  }

  render() {
    const { children, slot, ...rest } = this.props;

    const consultation = (
      <ConsultationContainer onClick={this.handleOpenConsultation}>
        {this.slotState.busyAppointments.length}
      </ConsultationContainer>
    );

    const detail = (
      <DetailContainer>
        {this.slotState.isBusy && consultation}
        <DurationContainer onClick={this.handleOpenDuration}>
          {this.duration} <TriangleIcon opened={this.slotState.openedType} />
        </DurationContainer>
      </DetailContainer>
    );

    const openDurationIcon = (
      <OpenDurationContainer>
        <TriangleOpenDurationIcon onClick={this.handleToggle} opened={this.slotState.openedType} />
      </OpenDurationContainer>
    );

    return (
      <Provider slotState={this.slotState}>
        <Range
          {...rest}
          width={this.slotState.width}
          offset={this.slotState.offset}
          opened={!!this.slotState.openedType}
        >
          <SlotElementsContainer
            data-duration={this.duration}
            title={this.slotState.title}
            hasTitle={this.hasTitle}
          >
            {children}
            {this.hasTitle && detail}
            {!this.hasTitle && openDurationIcon}
          </SlotElementsContainer>
          <Dropdown
            onMouseDown={e => e.stopPropagation()}
            width={this.slotState.width}
            type={this.slotState.openedType}
          />
        </Range>
      </Provider>
    );
  }
}

export default styled(Slot)``;
