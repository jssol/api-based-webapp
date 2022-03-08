import './index.css';
import { getData, getMovieData } from './modules/api.js';

const movieList = document.querySelector('.movie-list');
const movieDetails = document.querySelector('.movie-details');
const page = document.documentElement;

const displayMovies = () => {
  getData()
    .then((res) => {
      res.forEach((movie, index) => {
        const identity = (movie) => {
          const id = movie.Title.toLowerCase().replace(/\s/g, '-');
          return id;
        };
        movieList.innerHTML += `<article id="${identity(movie)}" class="movie">
                                <img class="movie-poster" src="${movie.Poster}"/>
                                <div class="l-c-buttons">
                                    <i class="like-btn">&#x2764;</i>
                                    <button class="comment-btn">Comments</button>
                                </div>
                                <p class="movie-title">${movie.Title}</p>
                                <ul class="type-year">
                                    <li class="movie-type">${movie.Type}</li>
                                    <li class="movie-year">${movie.Year}</li>
                                </ul>
                            </article>`;
      });
    });
};

const showComment = (btn) => {
  const movie = btn.parentElement.nextElementSibling.innerHTML;
  movieDetails.innerHTML = '';
  page.classList.add('comment-open');
  getMovieData(movie)
    .then((data) => {
      movieDetails.innerHTML = `
      <article class="movie-popup">
        <button class="pop-close-btn btn"><span class="pop-close"></span></button>
        <section class="main-popup-content">
          <section class="movie-img">
            <img class="m-poster" src="${data.Poster}"/>
          </section>
          <section class="m-title-plot">
            <h2 class="m-title">${data.Title}</h2>
            <ul class="type-year">
              <li class="movie-meta-info">${data.Type}</li>
              <li class="movie-meta-info">${data.Year}</li>
            </ul>
            <p class="m-plot">${data.Plot}</p>
            <section class="movie-comments">
              <h3 class="comments-subtitle">Comments</h3>
              <ul class="comments-list list"></ul>
              <h3 class="comments-subtitle">Add a comment</h3>
              <form action="#">
                <ul class="input-list list">
                  <li class="input-list-item">
                    <textarea name="comment" id="comment" class="comment-input" placeholder="Give us your thoughts ..."></textarea>
                  </li>
                  <li class="input-list-item">
                    <button type="submit" class="comment-submit btn">Comment</button>
                  </li>
                </ul>
              </form>
            </section>
          </section>
        </section>
      </article>`;
    });
};

document.addEventListener('DOMContentLoaded', displayMovies);

document.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('comment-btn')) {
    showComment(e.target);
  }

  if (e.target && (e.target.classList.contains('pop-close-btn') || e.target.classList.contains('pop-close'))) {
    page.classList.remove('comment-open');
  }
});