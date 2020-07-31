import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Layer } from 'grommet';
import { Button } from 'components/forms';
import { Close } from 'grommet-icons';
import { ReactComponentChildrenPropType } from 'types/customPropTypes';

const Wrapper = styled.div``;


class Sidebar extends React.PureComponent {

  static propTypes = {
    children: ReactComponentChildrenPropType.isRequired,
    position: PropTypes.string,
    full: PropTypes.string,
    modal: PropTypes.bool,
    plain: PropTypes.bool,
    onClose: PropTypes.func,
    onClickOutside: PropTypes.func,
    onEsc: PropTypes.func
  }

  static defaultProps = {
    position: 'right',
    full: 'vertical',
    modal: true,
    plain: false,
    onClose: () => null,
    onClickOutside: () => null,
    onEsc: () => null
  }

  handleClose = () => {
    const { onClose } = this.props;
    
    onClose && onClose();
  }

  handleClickOutside = () => {
    const { onClickOutside } = this.props;

    onClickOutside && onClickOutside();
  }

  handleEsc = () => {
    const { onEsc } = this.props;

    onEsc && onEsc();
  }

  render() {
    const {
      children,
      position,
      full,
      modal,
      plain,
    } = this.props;
    return (
      <Wrapper>
        <Layer
          position={position}
          full={full}
          modal={modal}
          plain={plain}
          onClickOutside={this.handleClickOutside}
          onEsc={this.handleClose}
        >
          {children}
          <Button icon={<Close />} onClick={this.handleClose} />
        </Layer>
      </Wrapper>
    );
  }
}

export default styled(Sidebar)``;
