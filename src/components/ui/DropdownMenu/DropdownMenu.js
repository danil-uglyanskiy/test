import React from 'react';
import { Menu } from 'grommet';

class DropdownMenu extends React.Component {
    render() {
        const { ...rest } = this.props;
        return(
          <Menu {...rest} />
        );
    }
}

export default DropdownMenu;