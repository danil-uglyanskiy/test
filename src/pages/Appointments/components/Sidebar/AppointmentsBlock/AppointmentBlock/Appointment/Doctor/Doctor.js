import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import { ellipsis } from 'polished';

import { shortName } from 'utils/names';
import { User } from 'icons';
import { display, typography } from 'theme/mixins';

const Wrapper = styled.div`
  ${display('flex', 'flex-start')};
`;

const Avatar = styled.div`
  margin-right: 8px;
  ${User} {
    width: 27px;
    height: 27px;
    fill: #3fc7fa;
    border-radius: 50%;  
  }
`;

const DoctorOrganization = styled.div`
  ${typography(12, 18, 400)};
  ${ellipsis(120)}
`;

const DoctorDetailContainer = styled.span``;

const DoctorName = styled.div`
  ${typography(13, 15, 500)}
  color: #4f5660;
`;

const DoctorSpecializations = styled.div`
  ${typography(12, 14, 400)};
  color: #4f5660;
`;

const DoctorContainer = styled.div`
  ${display('flex', 'flex-start', 'space-between')};
  width:100%;
`;

const DoctorSpecialization = styled.div`
  width:120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

@observer
class Doctor extends React.Component {

  static propTypes = {
    doctor: PropTypes.object
  }

  @computed get doctorName() {
    const { doctor } = this.props;
    return shortName(doctor);
  }

  @computed get doctorOrganization() {
    const { organization } = this.props.doctor;

    return organization?.title;
  }

  render() {
    const { doctor } = this.props;
    const listItems = doctor.specializations.map(specialization => (
      <DoctorSpecialization key={specialization.id} title={specialization.name}>
        {specialization.name}
      </DoctorSpecialization>
    ));

    return (
      <Wrapper>
        <Avatar>
          <User />
        </Avatar>
        <DoctorContainer>
          <DoctorDetailContainer>
            <DoctorName>
              {this.doctorName}
            </DoctorName>
            <DoctorSpecializations>
              {listItems}
            </DoctorSpecializations>
            <DoctorOrganization>
              {this.doctorOrganization}
            </DoctorOrganization>
          </DoctorDetailContainer>
        </DoctorContainer>
      </Wrapper>
    );
  }
}

export default Doctor;
