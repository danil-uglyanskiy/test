import React from 'react';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { Provider, observer, inject } from 'mobx-react';

import styled, { css } from 'styled-components';

import { DefaultLayout as Layout } from 'components/layouts';
import { EditPageHeader, SchedulesTable, TimeLine } from '../../components';
import Loader from 'components/common/Loader';

import EditScheduleState from './state/EditScheduleState';

const Overlay = styled.div`
  position:fixed;
  top:0;
  left:0;
  width:100vw;
  height:100vh;
  user-select: none;
  background-color: rgba(0, 0, 0, .4);
  ${({fetched}) => !fetched && css`
    z-index:10;
  `}
`;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  min-height: 100%;
  min-width:100%;
  z-index: 10;
`;

@inject('schedulesForm')
@observer
class Edit extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    schedulesForm: PropTypes.object
  };

  constructor(props) {
    super(props);

    const { schedulesForm, match } = props;
    const { params } = match;
    const { doctor_id } = params;

    this.editScheduleState = new EditScheduleState(doctor_id, schedulesForm);

  }

  componentDidMount() {
    this.editScheduleState.initComponent();
  }

  componentWillUnmount() {
    this.editScheduleState.dispose();
  }

  @computed get isFetchedDoctor() {
    return this.editScheduleState.isFetchedDoctor;
  }

  @computed get haveSlots() {
    const slots = this.editScheduleState.slots;

    return Object.keys(slots).length > 0;
  }

  @computed get isFetchedSlots() {
    return this.editScheduleState.isFetched;
  }

  @computed get doctor() {
    return this.isFetchedDoctor && this.editScheduleState.doctor;
  }

  render() {

    return (
      <Provider doctorStore={this.editScheduleState.doctorStore} editScheduleState={this.editScheduleState}>
        <Wrapper>
          <Overlay fetched={this.isFetchedSlots}>
            {(!this.isFetchedSlots || !this.isFetchedDoctor) && <Loader />}
          </Overlay>
          {this.isFetchedDoctor && (
            <Layout>
              <Layout.Header width='1376px'>
                <EditPageHeader doctor={this.doctor} />
              </Layout.Header>
              <Layout.Body width='1376px'>
                <TimeLine isVisible />
                {this.haveSlots && <SchedulesTable />}
              </Layout.Body>
            </Layout>
          )}
        </Wrapper>
      </Provider>
    );
  }
}

export default Edit;
