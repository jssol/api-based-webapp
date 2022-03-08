const getData = async (movie = 'the flash') => {
  const key = 'e7db26be';

  const data = await fetch(`https://www.omdbapi.com/?s=${movie}&apikey=${key}`);
  const moviesInfo = await data.json();
  return moviesInfo.Search;
};

// const movies = [];
// getData().then((data) => {
//   data.forEach((movie) => {
//     movies.push(movie);
//   });
// });

// console.log(movies);

const getMovieData = async (movie) => {
  const key = 'e7db26be';

  const data = await fetch(`https://www.omdbapi.com/?t=${movie}&plot=full&apikey=${key}`);
  const moviesInfo = await data.json();
  console.log(moviesInfo.Plot);
  return moviesInfo;
};
export { getData, getMovieData };
