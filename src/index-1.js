import generatorLis from './genLis';
import generatorCard from './genCard';

import API from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import '../sass/index.scss';

const debounce = require('lodash.debounce'); //подгружаем библиотеку тормозов

const searchcountry = new API();

const refs = {
  input: document.querySelector('#search-box'),
  ul: document.querySelector('.country-list'),
  card: document.querySelector('.country-info'),
};

refs.input.addEventListener(
  'input',
  debounce(e => {
    searchCountry(e);
  }, 300)
);

function searchCountry(e) {
  e.target.value = e.target.value.trim();
  searchcountry.searchName = e.target.value;
  searchcountry
    .fetchCountries()
    .then(countryArr => {
      console.log(countryArr.length);
      if (countryArr.length > 10) {
        notify('i');
        return;
      }
      countryArr.length === 1
        ? appCard(generatorCard(countryArr))
        : appLi(generatorLis(countryArr));
    })
    .catch(resetHTML);
}

function appCard({ position, HTML, l }) {
  refs.ul.innerHTML = '';
  refs.card.innerHTML = HTML;
}

function appLi({ position, HTML, l }) {
  refs.card.innerHTML = '';
  refs.ul.innerHTML = HTML;
}

function resetHTML(er) {
  refs.card.innerHTML = '';
  refs.ul.innerHTML = '';
  notify('error');
}

function notify(res) {
  switch (res) {
    case 's':
      Notify.success('Successfully loaded');
      break;
    case 'error':
      Notify.failure('Oops, there is no country with that name');
      break;

    case 'w':
      Notify.warning('Memento te hominem esse');
      break;

    case 'i':
      Notify.info('Too many matches found. Please enter a more specific name.');
  }
}
