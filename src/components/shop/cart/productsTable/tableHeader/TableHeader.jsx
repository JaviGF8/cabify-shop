import React from 'react';
import PropTypes from 'prop-types';

const TableHeader = ({ columns }) => (
  <ul className="products-list tableHead">
    <li className="products-list-title row">
      {columns && 0 < columns.length && columns.map((col) =>
        <div key={col.field} className={`col-${col.field}`}>{col.header}</div>
      )}
    </li>
  </ul>
);

TableHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
  })).isRequired,
};

export default TableHeader;
