import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

import Tab from './Tab';

const buttons = [
  { id: 'day', name: 'День' },
  { id: 'week', name: 'Неделя' },
  { id: 'month', name: 'Месяц' }
];

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width:100%;
  height: 41px;
  background-color: #ffffff;
  border-radius: 25px;
  padding: 5px;
`;

@observer
class Tabs extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string
  }

  @observable current = 'month';

  constructor(props) {
    super(props);

    const { value } = props;
    if (value) {
      this.current = value;
    }
  }

  @action
  handleTabClick = (id) => {
    const { onChange } = this.props;
    this.current = id;
    if (onChange) {
      onChange(id);
    }
  }

  render() {
    const listItems = buttons.map(button =>
      (
        <Tab
          key={button.id}
          button={button}
          onChange={this.handleTabClick}
          selected={button.id === this.current}
        />
      )
    );

    return (
      <Wrapper>
        {listItems}
      </Wrapper>
    );

  }
}

export default styled(Tabs)``;
