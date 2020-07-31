import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';

import { Checkmark, Cross, Clock } from 'icons';

const StatusCompleted = styled(Checkmark)`
  fill: #68DB88;
  width: 14px;
  height: 13px;
`;

const StatusCancelled = styled(Cross)`
  fill: red;
  width: 11px;
  height: 11px;
`;

const StatusBusy = styled(Clock)`
  width: 13px;
  height: 13px;
`;

const StatusText = styled.div`
  font-size: 14px;
  line-height: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 8px 10px;
  align-items: center;
  height: 34px;
  width: 115px;
  border-radius: 17px;
  ${({status}) => status === 'completed' && css`
    border: 1px solid #68DB88;
    color: #3CB95F;
  `}
  ${({status}) => status === 'cancelled' && css`
    border: 1px solid #E95E5E;
    color: #DF4A4A;
  `}
  ${({status}) => status === 'busy' && css`
    border: 1px solid #DBBC68;
    color: #D3B258;
  `}
`;

function ucfirst(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const statuses = {
  completed: <StatusCompleted />,
  cancelled: <StatusCancelled />,
  busy: <StatusBusy />
};

@withTranslation()
@observer
class Status extends React.Component {

  static propTypes = {
    status: PropTypes.string,
    t: PropTypes.func
  }

  render() {
    const { status, t } = this.props;

    return (
      <Wrapper status={status}>
        {statuses[status]}
        <StatusText>
          {t(`UI.Statuses.${ucfirst(status)}`)}
        </StatusText>
      </Wrapper>
    );
  }
}

export default Status;