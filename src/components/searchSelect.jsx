import React, { Component } from 'react';
import Select from 'react-select';
import DetailsCard from './detailsCard';
import { getAllCountryNames } from '../services/countryService';

class SearchSelect extends Component {
  state = {
    options: [],
  };

  async componentDidMount() {
    let { data: options } = await getAllCountryNames();
    options = options.map((option) => {
      return { value: option, label: option };
    });

    this.setState({ options });
  }

  render() {
    const { options } = this.state;
    const { selectedOption, optionDetails, onAdd } = this.props;
    return (
      <div>
        <Select
          value={selectedOption}
          onChange={this.props.onChange}
          options={options}
          isClearable
          placeholder="Select a country..."
        />
        {optionDetails && (
          <DetailsCard
            optionDetails={optionDetails}
            countryList={this.props.countryList}
            onAdd={onAdd}
          />
        )}
      </div>
    );
  }
}
export default SearchSelect;
