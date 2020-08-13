import http from './httpService';

const apiEndpoint = '/users';

export function getUser() {
  return http.get(`${apiEndpoint}/me`);
}

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    password: user.password,
    name: user.name,
  });
}

export function updateCountryList(CountryList) {
  return http.patch('/users/me', CountryList);
}
