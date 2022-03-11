/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/assets/img/logo-transparent.png
/* harmony default export */ const logo_transparent = (__webpack_require__.p + "logo-transparent.png");
;// CONCATENATED MODULE: ./src/modules/api.js
const getData = async (movie, page) => {
  const key = 'e7db26be';

  const data = await fetch(`https://www.omdbapi.com/?s=${movie}&apikey=${key}&page=${page}`);
  const moviesInfo = await data.json();
  return moviesInfo.Search;
};

const getMovieData = async (movie) => {
  const key = 'e7db26be';

  const data = await fetch(`https://www.omdbapi.com/?t=${movie}&plot=full&apikey=${key}`);
  const moviesInfo = await data.json();
  return moviesInfo;
};


;// CONCATENATED MODULE: ./src/modules/involvement.api.js
const getLikes = async () => {
  const appID = 'YUqI88f5a8VwBEjald5b';
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/likes`);
  const likes = await response.json();
  return likes;
};

const setLikes = async (movieID) => {
  const appID = 'YUqI88f5a8VwBEjald5b';
  const options = {
    method: 'POST',
    body: JSON.stringify({ item_id: movieID }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const result = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/likes`, options);
  const response = await result.text();
  return response;
};

const getComments = async (movieID) => {
  const appID = 'YUqI88f5a8VwBEjald5b';
  const res = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/comments?item_id=${movieID}`);
  const comments = await res.json();
  return comments;
};

const setComment = async (movieID, comment, name) => {
  const data = {
    item_id: movieID,
    username: name,
    comment,
  };
  const appID = 'YUqI88f5a8VwBEjald5b';
  const res = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/comments`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const status = await res.json();
  return status;
};



;// CONCATENATED MODULE: ./src/index.js





const movieList = document.querySelector('.movie-list');
const movieDetails = document.querySelector('.movie-details');
const page = document.documentElement;
const searchMovie = document.querySelectorAll('.search-input');
const menuButton = document.querySelector('.mobile_menu_btn');
const mobileMenu = document.querySelector('.mobile_menu');
const remButton = document.querySelector('.menu_close');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let movieName = 'marvel';
let prevNum = 2;
let nextNum = 2;

// Mobile Menu
// transition styles
mobileMenu.style.right = '-800px';
mobileMenu.style.transition = 'right 800ms';

// listen for a click on the menu button and X button
menuButton.addEventListener('click', () => {
  mobileMenu.style.display = 'block';
  setTimeout(() => {
    mobileMenu.style.right = '0px';
  }, 1);
});

remButton.addEventListener('click', () => {
  mobileMenu.style.right = '-800px';
  setTimeout(() => {
    mobileMenu.style.display = 'none';
  }, 900);
  menuButton.style.display = 'block';
});

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
  const moviesCount = document.querySelectorAll('.movies-count');
  const seriesCount = document.querySelectorAll('.series-count');
  const gamesCount = document.querySelectorAll('.games-count');
  moviesCount.forEach((counter) => {
    counter.innerHTML = movieCount;
  });
  seriesCount.forEach((counter) => {
    counter.innerHTML = serieCount;
  });
  gamesCount.forEach((counter) => {
    counter.innerHTML = gameCount;
  });
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
  getComments(id).then((comments) => {
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

const displayMovies = (title, page) => {
  getData(title, page)
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

searchMovie.forEach((searchInput) => {
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      movieName = searchInput.value;
      if (searchInput.value === '') {
        displayMovies('marvel');
      } else {
        displayMovies(movieName);
      }
      if (window.innerWidth > 600) {
        menuButton.style.display = 'none';
      } else {
        mobileMenu.style.right = '-800px';
        setTimeout(() => {
          mobileMenu.style.display = 'none';
        }, 900);
        menuButton.style.display = 'block';
      }
      mobileMenu.style.right = '-800px';
      setTimeout(() => {
        mobileMenu.style.display = 'none';
      }, 900);
    }
  });
});

prev.addEventListener('click', () => {
  displayMovies(movieName, prevNum);
  prevNum -= 1;
  nextNum -= 1;
  if (prevNum <= 1) {
    prev.setAttribute('disabled', '');
  }
});

next.addEventListener('click', () => {
  displayMovies(movieName, nextNum);
  prevNum += 1;
  nextNum += 1;
  if (prevNum > 1) {
    prev.removeAttribute('disabled', '');
  }
});

document.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('comment-btn')) {
    prev.style.display = 'none';
    next.style.display = 'none';
    showComment(e.target);
  }

  if (e.target && (e.target.classList.contains('pop-close-btn') || e.target.classList.contains('pop-close'))) {
    prev.style.display = 'block';
    next.style.display = 'block';
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

window.addEventListener('resize', () => {
  if (window.innerWidth > 600) {
    menuButton.style.display = 'none';
  } else {
    menuButton.style.display = 'block';
  }
});

/******/ })()
;