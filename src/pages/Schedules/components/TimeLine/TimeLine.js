import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const RegularPoint = styled.div`
  color: #4f5660;
  font-size: 10px;
  font-weight: 500;

  &:not(:last-child) {
    margin-right: 27px;
  }
`;

const BigPoint = styled.div`
  color: #4f5660;
  margin-right: 18px;
  font-size: 18px;
  font-weight: 500;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
  padding: 12px 15px 12px 84px;
  border: 1px solid #e7eaed;
  border-radius: 4px;
  margin-bottom: 20px;
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'}
`;

const timePoints = [
  { id: '1', value: '0:00' },
  { id: '2', value: '01:00' },
  { id: '3', value: '02:00' },
  { id: '4', value: '03:00' },
  { id: '5', value: '04:00' },
  { id: '6', value: '05:00' },
  { id: '7', value: '06:00' },
  { id: '8', value: '07:00' },
  { id: '9', value: '08:00' },
  { id: '10', value: '09:00' },
  { id: '11', value: '10:00' },
  { id: '12', value: '11:00' },
  { id: '13', value: '12:00' },
  { id: '14', value: '13:00' },
  { id: '15', value: '14:00' },
  { id: '16', value: '15:00' },
  { id: '17', value: '16:00' },
  { id: '18', value: '17:00' },
  { id: '19', value: '18:00' },
  { id: '20', value: '19:00' },
  { id: '21', value: '20:00' },
  { id: '22', value: '21:00' },
  { id: '23', value: '22:00' },
  { id: '24', value: '23:00' },
];

class TimeLine extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool
  }

  renderTimePoints = () => {
    return timePoints.map(point => (
      point.id === '1' || point.id === '13' ?
        <BigPoint key={point.id}>{point.value}</BigPoint> :
        <RegularPoint key={point.id}>{point.value}</RegularPoint>
    ));
  }

  render() {
    const { isVisible } = this.props;

    return (
      <Wrapper isVisible={isVisible}>
        {this.renderTimePoints()}
      </Wrapper>
    );
  }
}

export default TimeLine;
