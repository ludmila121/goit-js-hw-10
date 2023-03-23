const BASE_URL = 'https://restcountries.com/v3.1/name/';

const fieldsNames = '?fields=name,population,capital,flags,languages';

function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}${fieldsNames}`).then(response => {
    if (!response.ok) {
      throw new Error(response.message);
    }
    return response.json();
  });
}

export { fetchCountries };