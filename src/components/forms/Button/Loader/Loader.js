import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';

const LoadingIcon = styled(ReactLoading).attrs(() => ({
  color: 'currentColor',
  type: 'bubbles',
  width: '2.5em',
  height: '2.5em',
}))`
  margin: 0 auto;
`;

const LoaderS = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

@observer
class Loader extends Component {
  render() {
    const { className } = this.props;

    return (
      <LoaderS className={className}>
        <LoadingIcon />
      </LoaderS>
    );
  }
}

Loader.propTypes = {
  className: PropTypes.string,
};

export default Loader;
