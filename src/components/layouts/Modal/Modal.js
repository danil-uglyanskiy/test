import React from 'react';
import PropTypes from 'prop-types';
import { Portal } from 'react-portal';
import { display } from 'theme/mixins';
import styled from 'styled-components';

const Content = styled.div``;

const Wrapper = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 150;
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  ${display('flex', 'center', 'center')};
  overflow: auto;
`;

class Modal extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    opened: PropTypes.bool,
    onClose: PropTypes.func
  };

  refOverlay = React.createRef();

  static defaultProps = {
    className: '',
    opened: false,
    onClose: () => null
  };

  componentDidMount() {
    window.addEventListener('keyup', this.onKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.onKeyUp);
  }

  onClickOverlay = e => {
    if (e.target === this.refOverlay.current) {
      e.preventDefault();

      this.close(e);
    }
  };

  close = e => {
    const { onClose } = this.props;

    if (onClose) {
      onClose(e);
    }
  };

  onKeyUp = e => {
    const { opened } = this.props;

    if (opened && e.key === 'Escape') {
      this.close(e);
    }
  };

  render() {
    const { children, opened, ...rest } = this.props;
    const { onClickOverlay, refOverlay } = this;

    return (
      !!opened && (
        <Portal>
          <Wrapper {...rest} ref={refOverlay} onClick={onClickOverlay}>
            <Content>{children}</Content>
          </Wrapper>
        </Portal>
      )
    );
  }
}

export default styled(Modal)``;

export const modal = Component =>
  class extends React.PureComponent {
    static displayName = `modal(${Component.displayName})`;

    render() {
      return (
        <Modal {...this.props}>
          <Component {...this.props} />
        </Modal>
      );
    }
  };
