import './index.css';
import { getData, getMovieData } from './modules/api.js';

const movieList = document.querySelector('.movie-list');
const movieDetails = document.querySelector('.movie-details');

const displayMovies = () => {
  getData()
    .then((res) => {
      res.forEach((movie) => {
        movieList.innerHTML += `<article class="movie">
                                <img class="movie-poster" src="${movie.Poster}"/>
                                <p class="movie-title">${movie.Title}</p>
                                <ul class="type-year">
                                    <li class="movie-type">${movie.Type}</li>
                                    <li class="movie-year">${movie.Year}</li>
                                </ul>
                                <button class="comment">Comment</button>
                            </article>`;
      });
    });
};

const showComment = (btn) => {
  const movie = btn.previousElementSibling.previousElementSibling.innerHTML;
  getMovieData(movie)
    .then((data) => {
      movieList.style.display = 'none';
      movieDetails.innerHTML = `<article class="m">
                          <img class="m-poster" src="${data.Poster}"/>
                          <div class="m-title-plot">
                              <p class="m-title">${data.Title}</p>
                              <p class="m-plot">${data.Plot}</p>
                          </div>
                          <ul class="type-year">
                              <li class="movie-type">${data.Type}</li>
                              <li class="movie-year">${data.Year}</li>
                          </ul>
                      </article>`;
    });
};

document.addEventListener('DOMContentLoaded', displayMovies);

document.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('comment')) {
    showComment(e.target);
  }
});