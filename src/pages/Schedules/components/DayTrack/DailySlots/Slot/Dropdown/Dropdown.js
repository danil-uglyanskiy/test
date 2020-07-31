import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';

import DurationDropdown from './DurationDropdown';
import ConsultationDropdown from './ConsultationDropdown';
import { Tabs } from 'components/ui';
import { withTranslation } from 'react-i18next';

const TabsContainer = styled.div`
  background: white;
  padding: 25px 15px 0 15px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
`;

const Wrapper = styled.div`
    position:relative;
    margin: auto;
    cursor: initial;
    z-index:4;
    width:316px;
    margin-left: ${props => props.offset};
`;

@withTranslation()
@inject('slotState')
@observer
class Dropdown extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    width: PropTypes.number,
    slotState: PropTypes.object,
    t: PropTypes.func
  }

  @computed get offset() {
    const { width } = this.props;

    if (width > 300)
      return 'auto';

    const offset = (300 - width) / 2;
    return `-${offset}px`;
  }

  @computed get opened() {
    const { type } = this.props;

    return !!type;
  }

  @computed get consultationCount() {
    const { slotState } = this.props;

    return slotState.busyAppointments.length;
  }

  @computed get tabItems() {
    const { t } = this.props;
    return [
      {
        id: 'duration',
        name: t('SchedulesForm.Duration')
      },
      {
        id: 'consultation',
        name: t('SchedulesForm.Consultations', {count: this.consultationCount}),
        disabled: this.consultationCount === 0
      }
    ];
  }

  @computed get type() {
    const { slotState } = this.props;

    return slotState.openedType;
  }

  handleChange = (type) => {
    const { slotState } = this.props;

    slotState.handleToggleByType(type);
  }

  render() {
    const { slotState, ...rest } = this.props;

    const dropdown = (
      <Wrapper {...rest} offset={this.offset}>
        <TabsContainer>
          <Tabs
            items={this.tabItems}
            value={this.type}
            onChange={this.handleChange}
          />
        </TabsContainer>
        {this.type === 'duration' && <DurationDropdown />}
        {this.type === 'consultation' && <ConsultationDropdown />}
      </Wrapper>
    );

    return this.opened && dropdown;
  }
}

export default styled(Dropdown)``;
