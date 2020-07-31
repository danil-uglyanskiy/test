import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { observer } from 'mobx-react';

const Heading = styled.div`
	color: #4F5660;
	font-size: 16px;
	font-weight: 500;
	line-height: 19px;
`;

const Element = styled.div`
  margin-top: 20px;
  display: flex;
  width:100%;
`;

const NameElement = styled.div`
	color: #747D8A;
	font-size: 14px;
  line-height: 16px;
  width:200px;
`;

const DescriptionElement = styled.div`
	color: #4F5660;
	font-size: 14px;
  line-height: 18px;
  margin-left: 20px;
`;

const Wrapper = styled.div`
  width:100%;
  padding-top: 10px;
  padding-bottom: 15px;
`;

@observer
class AppointmentDetailList extends React.Component {

  static propTypes = {
    heading: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired
  }

  render() {
    const { heading, list } = this.props;
    const elements = list.map(element => (
      <Element key={element.name}>
        <NameElement>
          {element.name}
        </NameElement>
        <DescriptionElement>
          {element.description}
        </DescriptionElement>
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

export default AppointmentDetailList;