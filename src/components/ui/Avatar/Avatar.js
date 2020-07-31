import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import { AvatarIcon } from 'icons';
import { Image } from 'components/ui';

const Wrapper = styled.span`
    display: block;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
`;

const Icon = styled(AvatarIcon)`
  width: inherit;
  height: inherit;
`;

const Preview = styled.img`
  display: block;
  max-width: 100%;
  width: inherit;
  height: inherit;
  border-radius: 50%;
`;

@observer
class Avatar extends React.Component {

  static propTypes = {
    field: PropTypes.object
  }
  
  renderAvatar = () => {
    const { field } = this.props;

    if (field.files) {
      const url = URL.createObjectURL(field.files[0]);
      return <Preview src={url} />;
    }

    if (field.$('image_urls.thumb').value) {
      const url = field.$('image_urls.thumb').value;
      return <Preview as={Image} url={url} />;
    }

    return <Icon />;
  }

  render() {
    const { field } = this.props;
    const { size } = field.extra;

    return (
      <Wrapper
        width={size}
        height={size}
      >
        {this.renderAvatar()}
      </Wrapper>
    );
  }
}

export default Avatar;
