import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import Qs from 'qs';

import { Download, Default } from '.';
import Loader from 'components/common/Loader';

import instance from 'connection/instance';

const Image = styled.img``;

const Video = styled.video``;

const Wrapper = styled.div`
  min-width: 96px;

  ${Image},
  ${Video} {
    display: block;
    width: 100%;
  }
`;

@observer
class AttachmentPreview extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    src: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['light', 'dark'])
  }

  static defaultProps = {
    variant: 'light'
  }

  get meta() {
    const { src } = this.props;
    const [, params] = src.split('?');
    const qs = Qs.parse(params);

    return qs;
  }

  @observable isFetched = false;

  @observable data = null;

  componentDidMount() {
    const { src } = this.props;
    this.fetch(src);
  }

  fetch = (url) => {
    instance.get(url, { responseType: 'blob' })
      .then((response) => {
        this.setData(response);
        this.isFetched = true;
      });
  }

  setData = ({ data }) => {
    const reader = new window.FileReader();
    reader.readAsDataURL(data);

    reader.onload = () => {
      this.data = reader.result;
    };
  }

  videoFormatSupports(format) {
    // https://davidwalsh.name/detect-supported-video-formats-javascript
    const formats = {
      ogg: 'video/ogg; codecs="theora"',
      mp4: 'video/mp4; codecs="avc1.42E01E"',
      webm: 'video/webm; codecs="vp8, vorbis"',
      vp9: 'video/webm; codecs="vp9"',
      hls: 'application/x-mpegURL; codecs="avc1.42E01E"'
    };

    const video = document.createElement('video');

    return video.canPlayType(formats[format] || format);
  }

  renderContent = () => {
    const { variant } = this.props;
    const { filename, mime_type, width, height } = this.meta;
    const [type, format] = mime_type.split('/');

    if (type === 'video' && this.videoFormatSupports(format)) {
      return (
        <Video
          controls
          src={this.data}
        />
      );
    }

    if (type === 'image') {
      return (
        <Download
          href={this.data}
          download={filename}
        >
          <Image
            src={this.data}
            width={width}
            height={height}
            alt={filename}
          />
        </Download>
      );
    }

    return (
      <Default
        download={filename}
        href={this.data}
        variant={variant}
      >
        {filename}
      </Default>
    );
  }

  render() {
    const { ...rest } = this.props;

    return (
      <Wrapper {...rest}>
        {!this.isFetched && <Loader size="small" />}
        {(this.isFetched && this.data) && this.renderContent()}
      </Wrapper>
    );
  }
}

export default styled(AttachmentPreview)``;
