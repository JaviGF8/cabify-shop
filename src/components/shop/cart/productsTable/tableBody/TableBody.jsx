import React from 'react';
import PropTypes from 'prop-types';

const TableBody = ({ columns, dataKey, elements }) => (
  <ul className="products-list">
    {/* Render a row for every elements */}
    {elements && 0 < elements.length ? elements.map((element) => (
      <li key={element[dataKey]} className="product row">
        {/* Render a cell for every field */}
        {columns && 0 < columns.length && columns.map((col) =>
          <div key={col.field} className={`col-${col.field}`}>
            {/* If has a formatter, render the formatter, else the field */}
            {col.formatter ? col.formatter(element[col.field], element) : element[col.field]}
          </div>
        )}
      </li>
    )) : <li>No products found</li>}
  </ul>
);

TableBody.defaultProps = {
  elements: [],
};

TableBody.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string.isRequired,
    formatter: PropTypes.func,
    header: PropTypes.string.isRequired,
  })).isRequired,
  dataKey: PropTypes.string.isRequired,
  elements: PropTypes.array,
};

export default TableBody;
