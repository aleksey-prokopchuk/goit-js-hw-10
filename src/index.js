import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryLi = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

/* 
Розмітка для списку країн
      <li>
        <img
          class="flag"
          src=""
          alt=""
          width="40"
        />
        <p>Ukraine</p>
      </li>
*/

/* 
Розмітка для країни
      <p class="country-info__name">
        <img
          class="flag"
          src=${country.flags.svg}
          alt="111"
          width="40"
        />${country.name.official}
      </p>
      <p class="capital">Capital: <span>${country.capital}</span></p>
      <p class="population">Population: <span>${country.population}</span></p>
      <p class="languages">Languages: <span>${arrayLanguages.join(', ')}</span></p>

*/
//  Рендер списку країн __________________________________________

searchBox.addEventListener('input', debounce(getInfoCountry, DEBOUNCE_DELAY));

function getInfoCountry(event) {
  if (event.target.value.trim() != '') {
    fetchCountries(event.target.value.trim())
      .then(countrys => {
        let countryList = countrys.map(country => {
          return `<li>
        <img
          class="flag"
          src=${country.flags.svg}
          alt="111"
          width="40"
        />
        <p>${country.name.official}</p>
      </li>`;
        });

        if (countryList.length <= 10 && countryList.length >= 2) {
          countryInfo.innerHTML = '';
          countryLi.innerHTML = `${countryList.join('')}`;
        } else if (countryList.length > 10) {
          countryLi.innerHTML = '';
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else {
          renderCountry(countrys);
        }
      })
      .catch(error => Notify.failure(`${error}`));
  } else {
    countryLi.innerHTML = '';
    countryInfo.innerHTML = '';
  }
}

//  Рендер країни __________________________________________

function renderCountry(countrys) {
  countryLi.innerHTML = '';

  countryInfo.innerHTML = `${countrys.map(country => {
    const arrayLanguages = [].concat(Object.values(country.languages));

    return `<p class="country-info__name">
        <img
          class="flag"
          src=${country.flags.svg}
          alt="111"
          width="40"
        />${country.name.official}
      </p>
      <p class="capital">Capital: <span>${country.capital}</span></p>
      <p class="population">Population: <span>${country.population}</span></p>
      <p class="languages">Languages: <span>${arrayLanguages.join(
        ', '
      )}</span></p>`;
  })}`;
}
