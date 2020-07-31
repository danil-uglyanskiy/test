import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const dropKeyFrames = keyframes`
  0% {
    opacity: 0.5;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const OptionsWrapper = styled.div`
  position: absolute;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 6px;
  width: 132px;
  opacity: 0;
  animation:  ${dropKeyFrames} 0.1s forwards;
  animation-delay: 0.01s;
`;

const Option = styled.div`
  padding: 11px 6px 11px 20px;
  font-size: 13px;
  line-height: 15px;
  color: #ffffff;
  border-bottom: 1px solid #747D8A;
  background-color: #4F5660;
  cursor: pointer;
  
  &:hover {
    background-color: #747D8A;
  }
`;

class FilterOptions extends Component {
  static propTypes = {
    items: PropTypes.array,
    onBlur: PropTypes.func,
    onChange: PropTypes.func
  }

  refWrapper = React.createRef();

  componentDidMount() {
    this.refWrapper.current.focus();
  }

  handleOnClick = (filter) => () => {
    const { onChange } = this.props;

    onChange(filter);
  }

  render() {
    const { items, onBlur } = this.props;

    return (
      <OptionsWrapper
        ref={this.refWrapper}
        tabIndex="100"
        onBlur={onBlur}
      >
        {items.map((filter, index) => (
          <Option
            key={index}
            onClick={this.handleOnClick(filter)}
          >
            {filter.label}
          </Option>
        ))}
      </OptionsWrapper>
    );
  }
}

export default styled(FilterOptions)``;