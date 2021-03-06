import http from './httpService';
import { getUser } from './userService';

const apiEndpoint = '/countries';

function countryUrl(name) {
  return `${apiEndpoint}/${name}`;
}

export function getAllCountryNames() {
  return http.get(`${apiEndpoint}/all`);
}

export async function getCountries() {
  const countryList = await getUserCountryList();

  return Promise.all(
    countryList.map(async (countryName) => {
      const { data: countryDetails } = await http.get(countryUrl(countryName));

      const rowsToAdd = mapToViewRow(mapToViewCountry(countryDetails));
      return rowsToAdd;
    })
  );
}

export async function getUserCountryList() {
  const {
    data: { countryList },
  } = await getUser();
  return countryList;
}

export function getOptionDetails(countryName) {
  return http.get(countryUrl(countryName.value));
}

export function mapToViewCountry(country) {
  const { currencies, flag, name, population, rateSEK } = country;
  const ratesToSek = rateSEK.map((r) => ({
    base: r.base,
    rate: r.rates.SEK.toLocaleString('en-SE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
  }));

  return {
    currencies,
    flag,
    name,
    population: population.toLocaleString('en-SE'),
    ratesToSek,
  };
}

export function mapToViewRow(country) {
  const { flag, name, population, ratesToSek } = country;
  return ratesToSek.map((r) => ({
    base: r.base,
    flag,
    name,
    population,
    rate: r.rate,
  }));
}

export function getConvertedAmount(rateToSek, sekToConvert, base) {
  return `${(
    sekToConvert / parseFloat(rateToSek.replace(',', '.'))
  ).toLocaleString('en-SE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${base}`;
}
