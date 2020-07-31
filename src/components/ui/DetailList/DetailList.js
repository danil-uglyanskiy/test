import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { observer } from 'mobx-react';

const Heading = styled.div`
	color: #4F5660;
	font-size: 14px;
	font-weight: 500;
	line-height: 17px;
`;

const Element = styled.div`
  margin-top: 10px;
  display: flex;
  width:100%;
  justify-content: space-between;
`;

const NameElement = styled.div`
	color: #4F5660;
	font-size: 14px;
  line-height: 16px;
  max-width:100%;
  ${({haveExtra}) => haveExtra && css`
    max-width:70%;
  `}
`;

const ExtraElement = styled.div`
	color: #A1ABB8;
	font-size: 14px;
  line-height: 16px;
  text-align:end;
`;

const Wrapper = styled.div`
  width:100%;
  padding-top: 18px;
  padding-bottom: 15px;
  border-top: 1px solid #E7EAED;
`;

@observer
class DetailList extends React.Component {

  static propTypes = {
    heading: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired
  }

  render() {
    const { heading, list } = this.props;
    const elements = list.map(element => (
      <Element key={element.name}>
        <NameElement haveExtra={!!element.extra}>
          {element.name}
        </NameElement>
        <ExtraElement>
          {element.extra}
        </ExtraElement>
      </Element>
    ));
    return (
      <Wrapper>
        <Heading>
          {heading}
        </Heading>
        {elements}
      </Wrapper>
    );
  }
}

export default DetailList;