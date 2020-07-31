import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import { Heading } from 'grommet';
import { withRouter, Redirect } from 'react-router-dom';


import {
  MonthPicker,
  DoctorsFilter,
  // Search,
  SpecializationFilter,
  OrganizationFilter
} from 'components/forms';


const DoctorsFilterContainer = styled.div`
  margin-left: auto;
`;

const OrganizationFilterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  width: 300px;
  height: 41px;
  border-radius: 25px;
  background-color: #ffffff;
  border: none;
  ${OrganizationFilter}{
    width:100%;
  }
`;

const SpecsFilter = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  width: 300px;
  height: 41px;
  border-radius: 25px;
  background-color: #ffffff;
  border: none;
`;

const PageHeading = styled(Heading)`
  display: inline-block;
  margin-right: 35px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 57px;
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
`;

@withRouter
@inject('schedulesForm')
@observer
class PageHeader extends React.Component {
  static propTypes = {
    schedulesForm: PropTypes.object,
    heading: PropTypes.string,
    isVisible: PropTypes.bool
  };

  render() {
    const { heading, schedulesForm, isVisible } = this.props;
    const id = schedulesForm.$('doctor.id').value;

    return (
      <Wrapper isVisible={isVisible}>
        {id !== '' ? <Redirect to={`/schedules/${id}/edit`} /> : null}
        <PageHeading>{heading}</PageHeading>
        <OrganizationFilterContainer>
          <OrganizationFilter
            mode='filter'
            field={schedulesForm.$('organization')}
          />
        </OrganizationFilterContainer>
        <SpecsFilter>
          <SpecializationFilter
            mode='filter'
            field={schedulesForm.$('specializations')}
          />
        </SpecsFilter>
        <MonthPicker field={schedulesForm.$('date')} />
        <DoctorsFilterContainer>
          <DoctorsFilter
            mode='filter'
            field={schedulesForm.$('doctor')}
          />
        </DoctorsFilterContainer>
      </Wrapper>
    );
  }
}

export default styled(PageHeader)``;
