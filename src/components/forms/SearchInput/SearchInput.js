import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { Search } from "grommet-icons";

import { Input } from 'components/forms';

const Wrapper = styled.div`
  width: 240px;
  height: 36px;
`;


class SearchInput extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string
  }

  render() {
    const { placeholder, ...rest } = this.props;

    return (
      <Wrapper type='search' placeholder={placeholder} {...rest}>
        {/* <Search color="brand" /> */}
        <Input placeholder={placeholder} {...rest} />
      </Wrapper>
    );
  }
}

export default styled(SearchInput)``;
