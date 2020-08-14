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
    { path: 'base', label: 'Cur.' },

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
        <span>
          <i
            className="fa fa-times-circle"
            onClick={() => this.props.onDelete(country)}
          />
          {/* <i
            className="fa fa-times"
            onClick={() => this.props.onDelete(country)}
          /> */}
        </span>
      ),
    },
  ];

  conversionColumn = {
    path: 'convertedAmount',
    label: 'SEK to local cur.',
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
