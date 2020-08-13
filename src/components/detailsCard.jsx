import React, { Component } from 'react';
// import Countries from './countries';

class DetailsCard extends Component {
  render() {
    const { optionDetails, countryList, onAdd } = this.props;
    const { currencies, flag, name, population, ratesToSek } = optionDetails;

    return (
      <div className="card mt-2" style={{ width: '100%' }}>
        <img src={flag} className="card-img-top" alt={`The flag of ${name}`} />

        <ul className="list-group list-group-flush">
          <li className="list-group-item p-1">
            <p className="m-1">Country name</p>
            <h5 className="ml-4 mt-2">{name}</h5>
          </li>

          <li className="list-group-item p-1">
            <p className="m-1">Population</p>
            <h5 className="ml-4 mt-2">{population}</h5>
          </li>
          <li className="list-group-item p-1">
            <p className="m-1">Official currencies</p>
            {currencies.map((c) => (
              <h5
                className="ml-4 mt-2"
                key={c.code}
              >{`${c.name} (${c.code}), Symbol: ${c.symbol}`}</h5>
            ))}
          </li>
          <li className="list-group-item p-1">
            <p className="m-1">Rate to SEK</p>
            {ratesToSek.map((r) => (
              <h5
                className="ml-4 mt-2"
                key={r.base}
              >{`1 ${r.base} = ${r.rate} SEK`}</h5>
            ))}
          </li>
        </ul>

        {!countryList.includes(name) ? (
          <button
            className="btn btn-primary"
            onClick={() => onAdd(optionDetails)}
          >
            Add to my list
          </button>
        ) : (
          <p className="p-2 card-text text-center table-success">
            This country is already on your list
          </p>
        )}
      </div>
    );
  }
}

export default DetailsCard;
