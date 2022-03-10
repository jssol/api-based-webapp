import './index.css';
import './assets/img/logo-transparent.png';
import { getData, getMovieData } from './modules/api.js';
import {
  getLikes, getComments, setComment, setLikes,
} from './modules/involvement.api.js';

const movieList = document.querySelector('.movie-list');
const movieDetails = document.querySelector('.movie-details');
const page = document.documentElement;
const searchMovie = document.querySelector('.search-input');

// Function to count number of element on the page
const countItems = (items) => {
  let movieCount = 0;
  let serieCount = 0;
  let gameCount = 0;
  items.forEach((item) => {
    if (item.Type === 'movie') {
      movieCount += 1;
    } else if (item.Type === 'series') {
      serieCount += 1;
    } else if (item.Type === 'game') {
      gameCount += 1;
    }
  });
  const moviesCount = document.querySelector('.movies-count');
  const seriesCount = document.querySelector('.series-count');
  const gamesCount = document.querySelector('.games-count');
  moviesCount.innerHTML = movieCount;
  seriesCount.innerHTML = serieCount;
  gamesCount.innerHTML = gameCount;
  return { movieCount, serieCount, gameCount };
};

// Function to get & display lakes on the home page

const likeCount = (id, index, Likes) => {
  let like = 0;
  Likes.forEach((data) => {
    if (data.item_id === id) {
      like = data.likes;
    }
  });
  document.querySelectorAll('.likes-data').forEach((card, i) => {
    if (index === i) {
      card.innerHTML = like;
    }
  });
};

const commentsCount = (comments) => {
  let count = 0;
  if (comments.length > 0) {
    comments.forEach(() => {
      count += 1;
    });
  } else {
    count = 0;
  }
  return count;
};

const showComments = async (id) => {
  getComments(id)
    .then((comments) => {
      const count = commentsCount(comments);
      document.getElementById('comments-count').innerHTML = '';
      if (comments.length > 0) {
        comments.forEach((comment) => {
          const li = document.createElement('li');
          li.className = 'comment';
          li.innerHTML = `${comment.creation_date} ${comment.username}: ${comment.comment}`;
          document.getElementById('comments-count').innerHTML = count;
          document.querySelector('.comments-list').appendChild(li);
        });
      } else {
        document.querySelector('.comments-list').innerHTML = 'No comments yet!';
        document.querySelector('.comments-list').className = 'empty';
        document.getElementById('comments-count').innerHTML = '0';
      }
    });
};

const displayMovies = (title) => {
  getData(title)
    .then((res) => {
      movieList.innerHTML = '';
      res.forEach((movie) => {
        movieList.innerHTML += `<article id="${movie.imdbID}" class="movie">
                                <div class="poster-div"><img class="movie-poster" src="${movie.Poster}"/></div>
                                <ul class="type-year">
                                  <li class="movie-type">${movie.Type}</li>
                                  <li class="movie-year">${movie.Year}</li>
                                </ul>
                                <div class="l-c-buttons">
                                  <button type="button" class="like-btn btn">&#x2764; <span class="likes-data"></span></button>
                                  <button type="button" class="comment-btn btn">Comments</button>
                                </div>
                                <h3 class="movie-title">${movie.Title}</h3>
                            </article>`;
      });
      return res;
    })
    .then((movieList) => {
      countItems(movieList);
    })
    .then(() => {
      getLikes()
        .then((result) => result)
        .then((LikesArr) => {
          document.querySelectorAll('.like-btn').forEach((btn, i) => {
            likeCount(btn.parentElement.parentElement.id, i, LikesArr);
            btn.addEventListener('click', () => {
              if (btn.style.color !== 'red') {
                setLikes(btn.parentElement.parentElement.id).then(() => {
                  getLikes()
                    .then((result) => result)
                    .then((res) => {
                      btn.style.color = 'red';
                      likeCount(btn.parentElement.parentElement.id, i, res);
                    });
                });
              }
            });
          });
        });
    });
};

const showComment = (btn) => {
  const movieId = btn.parentElement.parentElement.id;
  const movie = btn.parentElement.nextElementSibling.innerHTML;
  movieDetails.innerHTML = '';
  page.classList.add('comment-open');
  getMovieData(movie).then((data) => {
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
              <h3 class="comments-subtitle">Comments(<span id="comments-count">0</span>)</h3>
              <ul class="comments-list list"></ul>
              <h3 class="comments-subtitle">Add a comment</h3>
              <form action="#" id="add-comment-form" class="${movieId}">
                <ul class="input-list list">
                  <li class="input-list-item">
                    <input type="text" name="name" id="name" class="name-input input" placeholder="Your name"/>
                  </li>
                  <li class="input-list-item">
                    <textarea name="comment" id="comment" class="comment-input input" placeholder="Give us your thoughts..."></textarea>
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
  showComments(movieId);
};

document.addEventListener('DOMContentLoaded', () => {
  displayMovies('marvel');
});

searchMovie.addEventListener('input', () => {
  if (searchMovie.value === '') {
    displayMovies('marvel');
  } else {
    displayMovies(searchMovie.value);
  }
});

document.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('comment-btn')) {
    showComment(e.target);
  }

  if (e.target && (e.target.classList.contains('pop-close-btn') || e.target.classList.contains('pop-close'))) {
    page.classList.remove('comment-open');
  }
});

document.addEventListener('submit', (e) => {
  if (e.target && e.target.id === 'add-comment-form') {
    e.preventDefault();
    const identifier = e.target.className;
    setComment(identifier, document.querySelector('.comment-input').value, document.querySelector('.name-input').value);
    e.target.reset();
  }
});
