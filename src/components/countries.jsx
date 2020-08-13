import React, { Component } from 'react';
import { toast } from 'react-toastify';
import CountriesTable from './countriesTable';
import Pagination from './common/pagination';
import {
  mapToViewCountry,
  mapToViewRow,
  getConvertedAmount,
  getCountries,
  getCountryList,
  getOptionDetails,
} from '../services/countryService';
import { paginate } from '../utils/paginate';
import _ from 'lodash';
import SearchBox from './searchBox';
import SearchSelect from './searchSelect';
import { updateCountryList } from '../services/userService';

class Countries extends Component {
  state = {
    countryList: [],
    countries: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: '',
    sortColumn: { path: '', order: 'asc' },
    sekToConvert: '',
    selectedOption: null,
    optionDetails: '',
  };

  async componentDidMount() {
    const countries = await getCountries();
    const countryList = await getCountryList();
    this.setState({ countries: countries.flat(), countryList });
  }

  handleAdd = async (optionDetails) => {
    const { sekToConvert } = this.state;
    let rowsToAdd = mapToViewRow(optionDetails);

    if (sekToConvert) {
      rowsToAdd.forEach((r) => {
        r.convertedAmount = getConvertedAmount(r.rate, sekToConvert, r.base);
      });
    }

    const originalCountries = this.state.countries;
    const countries = [...originalCountries, ...rowsToAdd];
    const originalCountryList = this.state.countryList;
    const countryList = [...originalCountryList, optionDetails.name];

    this.setState({ countryList, countries });

    try {
      await updateCountryList(countryList);
    } catch (ex) {
      toast.error('Something went wrong.');

      this.setState({
        countries: originalCountries,
        countryList: originalCountryList,
      });
    }
  };

  handleDelete = async (country) => {
    const originalCountries = this.state.countries;
    const countries = originalCountries.filter((m) => m.name !== country.name);
    const originalCountryList = this.state.countryList;
    const countryList = originalCountryList.filter((c) => c !== country.name);

    this.setState({ countries, countryList });

    try {
      await updateCountryList(countryList);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error('This country has already been deleted.');

      this.setState({
        countries: originalCountries,
        countryList: originalCountryList,
      });
    }
  };

  handleChange = async (selectedOption) => {
    selectedOption = selectedOption || '';
    this.setState({ selectedOption });
    if (!selectedOption) {
      this.setState({ optionDetails: '' });
    } else {
      console.log(selectedOption);
      const { data: optionDetails } = await getOptionDetails(selectedOption);
      console.log('optiondetails', optionDetails);
      this.setState({
        optionDetails: mapToViewCountry(optionDetails),
      });
    }
  };

  handleConversion = (e) => {
    const sekToConvert = e.target.value;
    if (sekToConvert) {
      const countries = [...this.state.countries];
      countries.forEach((country) => {
        country.convertedAmount = getConvertedAmount(
          country.rate,
          sekToConvert,
          country.base
        );
      });
      this.setState({ sekToConvert, countries });
    } else {
      this.setState({ sekToConvert: '' });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      countries: allCountries,
    } = this.state;

    let filtered = allCountries;
    if (searchQuery)
      filtered = allCountries.filter((c) =>
        c.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const countries = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: countries };
  };

  maybePluralize = (count, noun) =>
    `${count} ${noun}${count !== 1 ? 'ies' : 'y'}`;

  render() {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      sekToConvert,
      countryList,
      selectedOption,
      optionDetails,
    } = this.state;

    const { totalCount, data: countries } = this.getPagedData();

    return (
      <div className="row ">
        <div className="col-12 col-md-3 mb-5">
          <SearchSelect
            countryList={countryList}
            onAdd={this.handleAdd}
            onChange={this.handleChange}
            selectedOption={selectedOption}
            optionDetails={optionDetails}
          />
        </div>
        <div className="col">
          <div className="row">
            {countryList.length > 0 ? (
              <p className="col">
                You are watching {this.maybePluralize(totalCount, 'currenc')}.
              </p>
            ) : (
              <p className="col">
                You are not watching any currency. Select one, and add it to
                your list.
              </p>
            )}
            <div className="col">
              <label>
                Amount of SEK you want to convert:
                <input
                  type="number"
                  value={sekToConvert}
                  onChange={this.handleConversion}
                  className="form-control my-3"
                />
              </label>
            </div>
            <div className="col-12">
              <SearchBox value={searchQuery} onChange={this.handleSearch} />
            </div>
          </div>

          {countryList.length > 0 && (
            <CountriesTable
              countries={countries}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              onConversion={this.handleConversion}
              sekToConvert={sekToConvert}
            />
          )}
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Countries;
