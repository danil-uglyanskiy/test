import React from 'react';
import { Provider, observer } from 'mobx-react';
import styled from 'styled-components';
import { computed } from 'mobx';

import AppointmentsState from './states/ListState';

import Form from './Form';
import { display } from 'theme/mixins';
import { DefaultLayout as Layout } from 'components/layouts';
import { Navbar } from 'components/ui';
import { PageHeader, Table, Sidebar, ConfirmCancelAppointment } from '../../components';

const TableLayout = styled.div`
  ${display('flex', '', 'space-between')};
`;

@observer
class List extends React.Component {
  constructor(props) {
    super(props);

    this.appointmentsState = new AppointmentsState();
  }

  componentDidMount() {
    this.appointmentsState.init();
  }

  componentWillUnmount() {
    this.appointmentsState.dispose();
  }

  @computed get opened() {
    return !!this.appointmentsState.selectedAppointment;
  }

  render() {
    return (
      <Provider
        appointmentsState={this.appointmentsState}
      >
        <Layout>
          <Layout.Nav>
            <Navbar />
          </Layout.Nav>
          <Form>
            <Layout.Header>
              <PageHeader />
            </Layout.Header>
            <Layout.Body>
              <TableLayout>
                <Table />
                <Sidebar />
              </TableLayout>
            </Layout.Body>
          </Form>
          <ConfirmCancelAppointment opened={this.opened} />
        </Layout>
      </Provider>
    );
  }
}

export default List;
