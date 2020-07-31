import React from "react";
import PropTypes from "prop-types";
import { Table, TableHead, TableHeadCell, TableBody } from "components/tables";

const headers = [
  { key: 1, name: 'Имя' },
  { key: 3, name: 'Дата рождения' },
  { key: 4, name: 'Страхователь' },
  { key: 5, name: 'Номер дмс' }
];

class PatientsList extends React.Component {
  render() {
    const { children } = this.props;

    const tableHeaders = headers.map(item => (
      <TableHeadCell className='nowrap' key={item.key}>{item.name}</TableHeadCell>
    ));

    return (
      <Table>
        <TableHead>{tableHeaders}</TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    );
  }
}

PatientsList.propTypes = {
  children: PropTypes.array.isRequired
};

export default PatientsList;
