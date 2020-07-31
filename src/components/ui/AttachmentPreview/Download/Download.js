import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';

const Caption = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    position: absolute;
    margin-top: -8px;
    color: #FFF;
    padding: 4px 8px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    font-size: 13px;
    opacity: 0;
    transition: margin-top 0.25s, opacity 0.25s;
`;

const Wrapper = styled.a`
  display: block;
  position: relative;
  cursor: pointer;
  overflow: hidden;

  :hover {
    ${Caption} {
      margin-top: 0;
      opacity: 1;
    }
  }
`;

class Download extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    href: PropTypes.string.isRequired,
    download: PropTypes.string,
    t: PropTypes.func.isRequired
  };

  render() {
    const { children, className, href, download, t } = this.props;

    return (
      <Wrapper
        className={className}
        href={href}
        download={download}
      >
        {children}

        <Caption>
          {t('UI.Download')}
        </Caption>
      </Wrapper>
    );
  }
}

export default styled(withTranslation()(Download))``;
