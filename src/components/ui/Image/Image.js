import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import instance from "connection/instance";

const Wrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
`;

@observer
class Image extends Component {
  static propTypes = {
    className: PropTypes.string,
    url: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);

    this.imgEl = createRef();
  }

  componentDidMount() {
    const { url } = this.props;

    instance.get(url, { responseType: "blob" })
      .then(response => this.setImageSrcAttr(response));
  }

  setImageSrcAttr = (response) => {
    const reader = new window.FileReader();
    reader.readAsDataURL(response.data);

    reader.onload = () => {
      const imageDataUrl = reader.result;
      if (!this.imgEl.current) return null;

      this.imgEl.current.style.backgroundImage = `url("${imageDataUrl}")`;
    };
  }

  render() {
    const { className } = this.props;

    return (
      <Wrapper
        className={className}
        ref={this.imgEl}
      />
    );
  }
}

export default styled(Image)``;
