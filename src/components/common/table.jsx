import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const Table = ({ columns, sortColumn, onSort, data }) => {
  return (
    <div class="table-responsive">
      <table className="table table-sm table-striped">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody columns={columns} data={data} />
      </table>
    </div>
  );
};

export default Table;
