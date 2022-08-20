// export function fetchCountries(name) {
//   const URL = 'https://restcountries.com/v3.1/';
//   const SPECIFIED_FIELDS = 'name,capital,population,flags,languages';
//   fetch(`${URL}name/${name}?fields=${SPECIFIED_FIELDS}`).then(response => {
//     if (!response.ok) {
//       // console.log('Помилковий ввід назви країни');
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
//   // .then(data => {
//   //   console.log(data);
//   // });
// }

export function fetchCountries(name) {
  const URL = 'https://restcountries.com/v3.1/';
  const SPECIFIED_FIELDS = 'name,capital,population,flags,languages';
  return fetch(`${URL}name/${name}?fields=${SPECIFIED_FIELDS}`, {
    cache: 'force-cache',
  }).then(response => {
    if (!response.ok) {
      // console.log('Помилковий ввід назви країни');

      throw new Error('Oops, there is no country with that name');
    }

    return response.json();
  });
  //   // .then(data => {
  //   //   console.log(data);
  //   // });
}
