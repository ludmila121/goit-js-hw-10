import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries.js';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const countryRef = document.querySelector('.country-info');
const countryListRef = document.querySelector('.country-list');

inputRef.addEventListener('input', debounce(inputValue, DEBOUNCE_DELAY));

function inputValue(e) {
  const value = e.target.value.trim();

  if (!value) {
    clearPage();
    return;
  }

  fetchCountries(value)
    .then(response => {
      const amountOfCountries = response.length;

      clearPage();

      if (amountOfCountries === 1) {
        countryInfo(response);
        return;
      }

      if (amountOfCountries <= 10) {
        countryList(response);
      } else {
        Notify.info('Too many matches found. Please enter a more specific name.');
      }
    })
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}

function clearPage() {
  countryRef.innerHTML = '';
  countryListRef.innerHTML = '';
}

function countryInfo(array) {
  const markup = array
    .map(({ name, capital, population, languages, flags }) => {
      return `
        <div class="country-wrapper">
            <img src="${flags.svg}" alt="${name.common}" width="40" height="40">
            <h2>${name.official}</h2>
        </div>
        <p>
        <span>Capital: </span>${capital}
        </p>
        <p>
        <span>Population: </span>${population}
        </p>
        <p>
        <span>Languages: </span>${Object.values(languages).join(', ')}
        </p>
        `;
    })
    .join('');
  countryRef.insertAdjacentHTML('afterbegin', markup);
}

function countryList(array) {
  const markup = array
    .map(({ name, flags }) => {
      return `<li class="item">
                    <img src="${flags.svg}" alt="${name.common}" width="25" height="25">
                <h2 class="item-name">${name.official}</h2>
               </li>`;
    })
    .join('');
  countryListRef.insertAdjacentHTML('afterbegin', markup);
}