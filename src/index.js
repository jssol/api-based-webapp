import './index.css';
import { getData, getMovieData } from './modules/api.js';

const movieList = document.querySelector('.movie-list');
const movieDetails = document.querySelector('.movie-details');

getData()
  .then((res) => {
    res.forEach((movie) => {
      movieList.innerHTML += `<article class="movie">
                                <img class="movie-poster" src="${movie.Poster}"/>
                                <div class="l-c-buttons">
                                    <i class="like-btn">&#x2764;</i>
                                    <button class="comment-btn">Comment</button>
                                  </div>
                                <p class="movie-title">${movie.Title}</p>
                                <ul class="type-year">
                                    <li class="movie-type">${movie.Type}</li>
                                    <li class="movie-year">${movie.Year}</li>
                                </ul>
                            </article>`;
    });
  })
  .then(() => {
    document.querySelectorAll('.movie-poster').forEach((btn) => {
      btn.addEventListener('click', () => {
        getMovieData(btn.nextElementSibling.innerHTML).then((data) => {
          movieList.style.display = 'none';
          movieDetails.innerHTML = `<article class="m">
                                <img class="m-poster" src="${data.Poster}"/>
                                <div class="m-title-plot">
                                    <p class="m-title">${data.Title}</p>
                                    <p class="m-plot">${data.Plot}</p>
                                </div>
                                <ul class="m-type-year">
                                    <li class="m-type">${data.Type}</li>
                                    <li class="m-year">${data.Year}</li>
                                </ul>
                            </article>`;
        });
      });
    });
  })
  .catch((e) => {
    throw new Error(e);
  });
