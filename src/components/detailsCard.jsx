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
          <li className="list-group-item">
            <p>Country name</p>
            <h6>{name}</h6>
          </li>
          <li className="list-group-item">
            <p>Population</p>
            <h6>{population}</h6>
          </li>
          <li className="list-group-item">
            <p>Official currencies</p>
            {currencies.map((c) => (
              <h6
                key={c.code}
              >{`${c.name} (${c.code}), Symbol: ${c.symbol}`}</h6>
            ))}
          </li>
          <li className="list-group-item">
            <p>Rate to SEK</p>
            {ratesToSek.map((r) => (
              <h6 key={r.base}>{`1 ${r.base} = ${r.rate} SEK`}</h6>
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
          <p className="card-text text-center">
            This country is already on your list
          </p>
        )}
      </div>
    );
  }
}

export default DetailsCard;
