import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { TextInput } from 'grommet';
import { Search as SearchIcon } from 'grommet-icons';

const Search = styled(TextInput)`
  outline: none;
  box-shadow: none;
  font-size: 13px;
  border: none;

  ::placeholder {
    color: #a1abb8;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  border-radius: 25px;
  padding: 15px 20px;
  width: 397px;
  height: 41px;
  margin-right: 20px;

  svg {
    width: 12px;
    height: 12px;
    stroke: #2d91ff;
    
  }
`;

@observer
class SearchInput extends React.Component {
  static propTypes = {
    field: PropTypes.object
  }

  render() {
    const { field } = this.props;

    return (
      <Wrapper>
        <SearchIcon />
        <Search {...field && field.bind()} />
      </Wrapper>
    );
  }
}

export default styled(SearchInput)``;
