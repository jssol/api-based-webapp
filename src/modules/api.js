const getData = async (movie) => {
  const key = 'e7db26be';

  const data = await fetch(`https://www.omdbapi.com/?s=${movie}&apikey=${key}`);
  const moviesInfo = await data.json();
  return moviesInfo.Search;
};

const getMovieData = async (movie) => {
  const key = 'e7db26be';

  const data = await fetch(`https://www.omdbapi.com/?t=${movie}&plot=full&apikey=${key}`);
  const moviesInfo = await data.json();
  return moviesInfo;
};
export { getData, getMovieData };
