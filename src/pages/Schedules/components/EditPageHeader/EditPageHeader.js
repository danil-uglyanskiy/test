import React from 'react';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { lighten } from 'polished';
import { withRouter, Link } from 'react-router-dom';

import { Button, MonthPicker } from 'components/forms';
import { Image } from 'components/ui';
import { AvatarIcon } from 'icons';

import { shortName } from 'utils/names';

const SaveBtn = styled(Button)`
  display: flex;
  width: 111px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

const CancelBtn = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 105px;
  height: 36px;
  background-color: #e7eaed;
  color: #747d8a;
  font-size: 13px;
  font-weight: 500;
  border-radius: 4px;
  margin-right: 15px;
  transition: all .2s ease-in;

  &:hover {
    background-color: ${lighten(.1, '#e7eaed')};
  }
`;

const FormControls = styled.div`
  display: flex;
  align-items: center;
`;

const DoctorAvatar = styled.div`
  margin-right: 13px;
`;

const DoctorInfo = styled.div`
  color: #fff;
`;

const ShortName = styled.div`
  font-size: 24px;
  font-weight: 500;
`;

const Specializations = styled.span`
  font-size: 18px;
  text-transform: lowercase;
`;

const EditDoctorInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled(Image)`
  width: 57px;
  height: 57px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 11;
`;

@withRouter
@inject('schedulesForm', 'editScheduleState')
class EditPageHeader extends React.Component {
  static propTypes = {
    schedulesForm: PropTypes.object,
    doctor: PropTypes.object,
    editScheduleState: PropTypes.object,
    match: PropTypes.object
  }

  handleResetDoctorField = () => {
    const { schedulesForm } = this.props;
    const doctor = schedulesForm.$('doctor');

    doctor.reset();
  }

  handleSaveShedules = () => {
    const  { editScheduleState } = this.props;
    const { match: { params: { doctor_id } } } = this.props;

    editScheduleState.update({
        slotsPerDayHashMap: editScheduleState.slots,
        doctor: {
            id: doctor_id,
        }
    });
  }

  render() {
    const { schedulesForm, doctor } = this.props;

    return (
      <Wrapper>
        <EditDoctorInfo>
          <DoctorAvatar>
            {
              doctor.avatar ?
                <Avatar
                  url={doctor.avatar.image_urls.thumb}
                />
                : <AvatarIcon className='avatar' />
            }
          </DoctorAvatar>
          <DoctorInfo>
            <ShortName>
              {shortName(doctor)}
            </ShortName>
            <Specializations>
              {doctor.specializations.map(spec => spec.name).join(', ')}
            </Specializations>
          </DoctorInfo>
        </EditDoctorInfo>
        <MonthPicker field={schedulesForm.$('date')} />
        <FormControls>
          <CancelBtn to='/schedules' onClick={this.handleResetDoctorField}>Отменить</CancelBtn>
          <SaveBtn variant='primary' onClick={this.handleSaveShedules}>Сохранить</SaveBtn>
        </FormControls>
      </Wrapper>
    );
  }
}

export default styled(EditPageHeader)``;
