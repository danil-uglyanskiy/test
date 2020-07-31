import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { ReactComponent as DownIcon } from './images/down.svg';

const SelectControlS = styled.div`
  display: flex;
  align-items: center;
`;

const CaptionS = styled.div`
  ${({ theme }) => theme.typo.link12}
`;

const DownIconS = styled(DownIcon)`
  height: 1.5rem;
  margin-left: 0.5rem;
  fill: ${({ theme }) => theme.colors.primary};
`;

@observer
class SelectControl extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    text: PropTypes.string.isRequired,
  };

  render() {
    const { text, className, style } = this.props;

    return (
      <SelectControlS
        className={className}
        style={style}
      >
        <CaptionS>
          {text}
        </CaptionS>
        <DownIconS />
      </SelectControlS>
    );
  }
}

export default SelectControl;
