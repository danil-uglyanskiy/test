import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { withTranslation } from 'react-i18next';

import moment from 'utils/moment';
import CancelAppointmentForm from './form/CancelAppointmentForm';
import { Prompt } from 'components/ui';
import { typography } from 'theme/mixins';
import { Button, Input } from 'components/forms';
import { Modal } from 'components/layouts';

const ModalButtonDelete = styled(Button)`
  width: 122px;
`;

const ModalButtonCancel = styled(Button)`
  width: 122px;
  background:white;
  color: #747D8A;
`;

const TitleContainer = styled.div`
  ${typography(20, 28, 400)};
  color: #4F5660;
  text-align:center;
`;

@withTranslation()
@inject('appointmentsState')
@observer
class ConfirmCancelAppointment extends React.Component {

  static propTypes = {
    appointmentsState: PropTypes.object,
    opened: PropTypes.bool,
    t: PropTypes.func
  }

  constructor(props) {
    super(props);

    const hooks = {
      onSuccess: this.handleSuccess
    };

    this.cancelAppointmentForm = new CancelAppointmentForm({}, { hooks });
  }

  handleSuccess = (form) => {
    const data = form.values();
    const { appointmentsState } = this.props;
    this.cancelAppointmentForm.$('cancelled_why').clear();
    appointmentsState.deleteAppointment(data.cancelled_why);
  }

  @computed get fromTime() {
    const { appointmentsState } = this.props;
    let result = '';
    if (appointmentsState.selectedAppointment)
      result = moment(appointmentsState.selectedAppointment.start_date).format('HH:mm');
    return result;
  }

  @computed get toTime() {
    const { appointmentsState } = this.props;
    let result = '';
    if (appointmentsState.selectedAppointment)
      result = moment(appointmentsState.selectedAppointment.end_date).format('HH:mm');
    return result;
  }

  @computed get day() {
    const { appointmentsState } = this.props;
    let result = '';
    if (appointmentsState.selectedAppointment)
      result = moment(appointmentsState.selectedAppointment.start_date).format('D MMMM');
    return result;
  }

  handleClose = () => {
    const { appointmentsState } = this.props;
    appointmentsState.clearSelectedAppointment();
  }

  handleConfirm = (e) => {
    this.cancelAppointmentForm.onSubmit(e);
  }


  render() {
    const { opened, t } = this.props;
    return (
      <Modal opened={opened} onClose={this.handleClose}>
        <Prompt>
          <Prompt.Content>
            <Prompt.Title>
              <TitleContainer>
                {t('Appointments.Cancel', { fromTime: this.fromTime, toTime: this.toTime, day: this.day })}
              </TitleContainer>
            </Prompt.Title>
            <Input
              field={this.cancelAppointmentForm.$('cancelled_why')}
              autoFocus
            />
          </Prompt.Content>
          <Prompt.Footer>
            <Prompt.Buttons>
              <ModalButtonDelete onClick={this.handleConfirm} variant='danger' rounded>
                {t('UI.Delete')}
              </ModalButtonDelete>
              <ModalButtonCancel rounded onClick={this.handleClose}>
                {t('UI.Cancel')}
              </ModalButtonCancel>
            </Prompt.Buttons>
          </Prompt.Footer>
        </Prompt>
      </Modal>
    );
  }
}

export default ConfirmCancelAppointment;
