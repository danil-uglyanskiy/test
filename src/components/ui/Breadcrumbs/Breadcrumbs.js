import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { observer } from 'mobx-react';

const Element = styled.div`
  color: #747D8A;
  position: relative;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-right: 15px;
  line-height: 29px;
  &:before{
    position: absolute;
    content: '/ ';
    left: -10px;
  }
  ${({first}) => first && css`
    color: #4F5660;
    font-size: 24px;
    font-weight: 500;
    margin-right: 25px;
    line-height: 29px;
    &:before{
      position: absolute;
      content: '';
    }
  `}
  ${({last}) => last && css`
    cursor: inherit;
  `}
`;

const Wrapper = styled.div`
  width:100%;
  display: flex;
  align-items: baseline;
`;

@observer
class Breadcrumbs extends React.Component {

    static propTypes = {
        list: PropTypes.array.isRequired
    }

    handleClick = (element, index) => {
      const { list } = this.props;
      if (index !== list.length - 1) {
        element.onClick();
      }
    }

    render() {
        const { list } = this.props;

        return (
          <Wrapper>
            {list.map((element, index) => (
              <Element
                key={index}
                first={index === 0}
                last={index === list.length -1}
                onClick={() => this.handleClick(element, index)}
              >
                {element.name}
              </Element>
                ))}
          </Wrapper>
        );
    }
}

export default Breadcrumbs;