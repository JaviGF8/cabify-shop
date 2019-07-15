import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from './tableHeader';
import TableBody from './tableBody';


const Table = ({ columns, dataKey, elements }) => (
  <>
    <TableHeader
      columns={columns}
    />
    <TableBody
      columns={columns}
      dataKey={dataKey}
      elements={elements}
    />
  </>
);

Table.defaultProps = {
  elements: [],
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string.isRequired,
    formatter: PropTypes.func,
    header: PropTypes.string.isRequired,
  })).isRequired,
  dataKey: PropTypes.string.isRequired,
  elements: PropTypes.array,
};

export default Table;
