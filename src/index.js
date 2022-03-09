import './index.css';
import { getData, getMovieData } from './modules/api.js';
import { getLikes, getComments, setComment } from './modules/involvement.api.js';

const movieList = document.querySelector('.movie-list');
const movieDetails = document.querySelector('.movie-details');
const page = document.documentElement;

// Function to count number of element on the page
const countItems = (arr) => {
  let count = 0;
  arr.forEach(() => {
    count += 1;
  });
  const itemCount = document.querySelector('.item-count');
  itemCount.innerHTML = count;
  return count;
};

// Function to get & display lakes on the home page
const likeCount = (item, id, index) => {
  getLikes()
    .then((result) => {
      let like = 0;
      result.forEach((data) => {
        if (data.item_id === id) {
          like = data.likes;
        }
      });
      return like;
    })
    .then((likes) => {
      document.querySelectorAll('.likes-data').forEach((card, i) => {
        if (index === i) {
          card.innerHTML = likes;
        }
      });
    });
};

const showComments = async (id) => {
  getComments(id)
    .then((comments) => {
      let commentsCount = 0;
      if (comments.length > 0) {
        comments.forEach((comment) => {
          commentsCount += 1;
          const li = document.createElement('li');
          li.className = 'comment';
          li.innerHTML = `${comment.creation_date} ${comment.username}: ${comment.comment}`;

          document.querySelector('.comments-list').appendChild(li);
        });
      } else {
        document.querySelector('.comments-list').innerHTML = 'No comments yet!';
        document.querySelector('.comments-list').className = 'empty';
      }
      document.getElementById('comments-count').innerHTML = commentsCount;
    });
};

const displayMovies = (title) => {
  getData(title)
    .then((res) => {
      res.forEach((movie, i) => {
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
        likeCount(movie, movie.imdbID, i);
      });
      return res;
    })
    .then((movieList) => {
      countItems(movieList);
    });
};

const showComment = (btn) => {
  const movieId = btn.parentElement.parentElement.id;
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
              <h3 class="comments-subtitle">Comments(<span id="comments-count"></span>)</h3>
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

document.addEventListener('DOMContentLoaded', displayMovies('marvel'));

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
