import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withTranslation } from 'react-i18next';

import { Input, Form, Button } from 'components/forms';
import DurationForm from './form/DurationForm';

const TimeContainer = styled.div`
	color: #4F5660;
	font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TimeHeadingContainer = styled.div``;

const InputContainer = styled.div`
  width: 100px;
  height:32px;
  position: relative;
  &:before{
    content: attr(data-min);
    position: absolute;
    right: 12px;
    top: 11px;
    color: #A1ABB8;
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
  }
`;

const ButtonContainer = styled.div`
  position:relative;
  z-index:4;
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
`;

const CancelButton = styled(Button)`
  margin-right:5px;
  height:28px;
  border-radius: 4px;
  width: 82px;
`;

const SaveButton = styled(Button)`
  height:28px;
  width: 82px;
  border-radius: 4px;
`;

const MainContainer = styled.div`
  background:white;
  padding: 20px 15px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
`;

const Wrapper = styled.div`
  :before{
    content: '';
    position:absolute;
    top: -14px;
    left: 140px;
    width:10px;
    border: 10px solid transparent; border-bottom: 7px solid white;
    z-index: 10;
  }
`;

@withTranslation()
@inject('slotState')
@observer
class DurationDropdown extends React.Component {
  static propTypes = {
    slotState: PropTypes.object,
    t: PropTypes.func,
    width: PropTypes.number
  }

  constructor(props) {
    super(props);

    const hooks = {
      onSuccess: this.handleSuccess
    };

    this.durationForm = new DurationForm({}, { hooks });
    this.durationForm.$('duration').value = props.slotState.duration;
  }

  handleSuccess = (form) => {
    const { slotState } = this.props;

    const values = form.values();
    slotState.setDuration(values.duration);
  }

  render() {
    const { slotState, t, ...rest } = this.props;
    
    return (
      <Wrapper {...rest}>
        <Form form={this.durationForm}>
          <MainContainer>
            <TimeContainer>
              <TimeHeadingContainer>
                {t('Schedule.Consultation.Time')}
              </TimeHeadingContainer>
              <InputContainer data-min={t('UI.Time.Min')}>
                <Input
                  autoFocus
                  field={this.durationForm.$('duration')}
                />
              </InputContainer>
            </TimeContainer>
          </MainContainer>
          <ButtonContainer>
            <CancelButton size='small' variant='secondary' onClick={slotState.handleClose}>
              {t('UI.Cancel')}
            </CancelButton>
            <SaveButton size='small' type='submit'>
              {t('UI.Save')}
            </SaveButton>
          </ButtonContainer>
        </Form>
      </Wrapper>
    );
  }
}

export default styled(DurationDropdown)``;
