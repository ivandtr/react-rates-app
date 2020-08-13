import React, { Component } from 'react';
import Table from './common/table';

class CountriesTable extends Component {
  columns = [
    {
      content: (country) => (
        <img
          src={country.flag}
          className="mr-1"
          height="20"
          alt={`The flag of ${country.name}`}
        />
      ),
      key: 'flag',
    },

    { path: 'name', label: 'Name' },
    { path: 'population', label: 'Population' },
    { path: 'base', label: 'Currency' },

    {
      content: (country) => (
        <span>{`1 ${country.base} = ${country.rate.toLocaleString('en-SE', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} SEK`}</span>
      ),
      label: 'Rate to SEK',
      key: 'ratetosek',
    },

    {
      key: 'delete',
      content: (country) => (
        <button
          onClick={() => this.props.onDelete(country)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  conversionColumn = {
    path: 'convertedAmount',
    label: 'SEK to local currency',
  };

  render() {
    if (this.props.sekToConvert && !!(this.columns.length < 7)) {
      this.columns.splice(-1, 0, this.conversionColumn);
    } else if (!this.props.sekToConvert && this.columns.length > 6) {
      this.columns.splice(-2, 1);
    }

    const { countries, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={countries}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default CountriesTable;
