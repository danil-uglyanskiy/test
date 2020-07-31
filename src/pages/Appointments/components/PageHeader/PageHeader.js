import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Heading } from 'grommet';
import { withRouter } from "react-router-dom";
import { computed } from 'mobx';
import { withTranslation } from 'react-i18next';

import Tabs from './Tabs';
import { MonthPicker, Button } from 'components/forms';
import { display, typography } from 'theme/mixins';
import { Calendar, Menu } from 'icons';

const PageHeading = styled(Heading)`
  display: inline-block;
  margin-right: 30px;
`;

const CalendarIcon = styled(Calendar)`
   display: inline-block;
   margin-right: 10px;
   width: 21px;
   height: 21px;
 `;

const TableIcon = styled(Menu)`
   display: inline-block;
   margin-right: 10px;
   width: 21px;
   height: 17px;
   fill: #2d91ff;
   path {
     width: 21px;
     height: 21px;
   }
 `;

const CalendarBtn = styled(Button)`
   ${display('flex', 'center', 'center')};
   ${typography(13, 18, 500)};
   margin-right: 28px;
   height: 25px;
   color: #1A7CE8 !important;
   background-color: transparent;
   &:hover {
     background-color: transparent;
   }
   svg {
     path, rect {
       fill: #1A7CE8;
     }
   }
 `;

const TabsContainer = styled.div`
  width: 281px;
  margin-left: 15px;
 `;

const TableBtn = styled(Button)`
   ${display('flex', 'center', 'center')};
   ${typography(13, 18, 500)};
   height: 25px;
   color: #a1abb8;
   background-color: transparent;

   &:hover {
     background-color: transparent;
   }

   svg {
     path, rect {
       fill: #a1abb8;
     }
   }
 `;

const CalendarFilter = styled.div`
  margin-left: auto;
`;

const Wrapper = styled.div`
  ${display('flex', 'center')}; 
  height: 41px;
`;

@withTranslation()
@inject('appointmentsState')
@withRouter
@observer
class PageHeader extends React.Component {
  static propTypes = {
    t: PropTypes.func,
    appointmentsState: PropTypes.object,
    history: PropTypes.object
  }

  @computed get disabled() {
    const { appointmentsState } = this.props;
    return appointmentsState.isPending;
  }

  handleTabChange = (type) => {
    const { history } = this.props;
    history.push(`/appointments/${type}`);
  }

  render() {
    const { appointmentsState, t } = this.props;

    return (
      <Wrapper>
        <PageHeading>
          {t('Appointments.Header.Consultations')}
        </PageHeading>
        <CalendarBtn variant='secondary'>
          <CalendarIcon />
          {t('Appointments.Header.Calendar')}
        </CalendarBtn>
        <TableBtn variant='secondary'>
          <TableIcon />
          {t('Appointments.Header.Table')}
        </TableBtn>
        <CalendarFilter>
          <MonthPicker field={appointmentsState.form.$('date')} disabled={this.disabled} />
        </CalendarFilter>
        <TabsContainer>
          <Tabs
            onChange={this.handleTabChange}
          />
        </TabsContainer>
      </Wrapper>
    );
  }
}

export default styled(PageHeader)``;
