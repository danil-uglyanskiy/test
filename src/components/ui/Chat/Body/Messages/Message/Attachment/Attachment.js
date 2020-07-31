import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { AttachmentPreview } from 'components/ui';

const Wrapper = styled.div``;

class Attachment extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    message: PropTypes.object.isRequired,
    type: PropTypes.oneOf(['own', 'their'])
  }

  render() {
    const { message: { attachments }, type, ...rest } = this.props;

    return (
      <Wrapper {...rest}>
        <AttachmentPreview
          src={attachments[0].url}
          variant={type === 'their' ? 'dark' : 'light'}
        />
      </Wrapper>
    );
  }
}

export default styled(Attachment)``;
