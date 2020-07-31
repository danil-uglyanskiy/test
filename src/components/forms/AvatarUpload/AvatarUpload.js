import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import styled, { css } from 'styled-components';

import instance from 'connection/instance';

import { Avatar } from 'components/ui';

const Wrapper = styled.div`
  ${({ size }) => css`
    display: flex;
    flex-shrink: 0;
    width: ${size}px;
    height: ${size}px;
  `}
`;

@observer
class AvatarUpload extends Component {
  static defaultProps = {
    size: 64,
  };

  static propTypes = {
    className: PropTypes.string,
    size: PropTypes.number,
    url: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.imgNode = createRef();
  }

  componentDidMount() {
    const { url } = this.props;
    instance.get(url, { responseType: 'blob' })
      .then(response => this.setImageSrc(response));
  }

  setImageSrc = (response) => {
    const reader = new window.FileReader();
    reader.readAsDataURL(response.data);

    reader.onload = () => {
      const imageDataUrl = reader.result;
      if (this.imgNode.current) {
        this.imgNode.current.style.backgroundImage = `url('${imageDataUrl}')`;
      }
    };
  }

  render() {
    const { size, ...rest } = this.props;

    return (
      <Wrapper
        {...rest}
        size={size}
        ref={this.imgNode}
      >
        <Avatar />
      </Wrapper>
    );
  }
}

export default AvatarUpload;
