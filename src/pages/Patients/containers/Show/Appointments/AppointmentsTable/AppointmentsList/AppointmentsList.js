import React from "react";
import PropTypes from "prop-types";
import { Table, TableHead, TableHeadCell, TableBody } from "components/tables";

const headers = [
  { key: 1, name: 'Дата' },
  { key: 2, name: 'Время' },
  { key: 3, name: 'Тип' },
  { key: 4, name: 'Пациент' },
  { key: 5, name: 'Врач' },
  { key: 6, name: 'Специализация' },
  { key: 7, name: 'Статус' },
  { key: 8, name: '' }
];

class AppointmentsList extends React.Component {
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

AppointmentsList.propTypes = {
  children: PropTypes.array.isRequired
};

export default AppointmentsList;
