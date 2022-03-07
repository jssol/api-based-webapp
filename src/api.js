const getData = async (movie = 'the flash') => {
  const key = 'e7db26be';

  const data = await fetch(`http://www.omdbapi.com/?s=${movie}&apikey=${key}`);
  const moviesInfo = await data.json();
  return moviesInfo.Search;
};

const getMovieData = async (movie) => {
  const key = 'e7db26be';

  const data = await fetch(`http://www.omdbapi.com/?t=${movie}&plot=full&apikey=${key}`);
  const moviesInfo = await data.json();
  console.log(moviesInfo.Plot);
  return moviesInfo;
};
export { getData, getMovieData };
