import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Heading } from 'grommet';
import { Link } from 'react-router-dom';

import { Button } from 'components/forms';

const PageHeading = styled(Heading)`
  display: inline-block;
  margin-right: 35px;
`;

const HeaderButton = styled(Button)`
  border-radius: 4px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

class DoctorsPageHeader extends React.PureComponent {

  static propTypes = {
    heading: PropTypes.string,
    btnText: PropTypes.string,
    link: PropTypes.string
  }

  render() {
    const { heading, btnText, link } = this.props;

    return (
      <Wrapper>
        <PageHeading>{heading}</PageHeading>
        <Link to={link}>
          <HeaderButton>{btnText}</HeaderButton>
        </Link>
      </Wrapper>
    );
  }
}

export default styled(DoctorsPageHeader)``;
