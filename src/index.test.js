/**
 * @jest-environment jsdom
 */

import countItems from './modules/_mocks_/countItemsFunc.js';

const movies = [];

const setComment = (movies, comment, id) => {
  const ids = movies.map((movie) => movie.id);

  if (ids.includes(id)) {
    movies.forEach((movie) => {
      if (movie.id === id) {
        movie.comments.push(comment);
      }
    });
  } else {
    const movie = {
      comments: [],
      id,
    };
    movie.comments.push(comment);
    movies.push(movie);
  }
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

const Search = [
  {
    Title: 'batman',
    Plot: 'Just another movie...',
    imdbID: 'tt1110',
    Poster: 'N/A',
    Type: 'Movie',
    Year: 2020,
  },
  {
    Title: 'marvel',
    Plot: 'Just another movie...',
    imdbID: 'tt1110',
    Poster: 'N/A',
    Type: 'Movie',
    Year: 2020,
  },
  {
    Title: 'DC legends',
    Plot: 'Just another movie...',
    imdbID: 'tt1110',
    Poster: 'N/A',
    Type: 'Movie',
    Year: 2020,
  },
  {
    Title: 'The Flash',
    Plot: 'Just another movie...',
    imdbID: 'tt1110',
    Poster: 'N/A',
    Type: 'Movie',
    Year: 2020,
  },
];

describe('Test countItems() function', () => {
  document.body.innerHTML = '<span class="item-count"></span><section class="movie-list"></section>';
  const movieList = document.querySelector('.movie-list');
  const container = document.querySelector('.item-count');
  Search.forEach((item) => {
    movieList.innerHTML += `<article class="movie">
                                <img class="movie-poster" src="${item.Poster}"/>
                                <div class="l-c-buttons">
                                    <i class="like-btn">&#x2764; <span class="likes-data"></span></i>
                                    <button class="comment-btn">Comment</button>
                                </div>
                                <p class="movie-title">${item.Title}</p>
                                <ul class="type-year">
                                    <li class="movie-type">${item.Type}</li>
                                    <li class="movie-year">${item.Year}</li>
                                </ul>
                            </article>`;
  });
  test('Gives the same result as counting DOM element', () => {
    const movieCard = document.querySelectorAll('.movie').length;
    expect(countItems(Search)).toEqual(movieCard);
  });

  test('Gives the correct number of items on the page', () => {
    expect(container.innerHTML).toBe('4');
  });
  test('Gives the right number of items from the API', () => {
    expect(countItems(Search)).toEqual(4);
  });
});

describe('Test the commentsCount() function', () => {
  test('Add one comment to a movie with id "zlatan"', () => {
    setComment(movies, 'Good', 'zlatan');
    movies.forEach((movie) => {
      if (movie.id === 'zlatan') {
        expect(commentsCount(movie.comments)).toEqual(1);
      }
    });
  });

  test('Add two comments to a movie with id "messi"', () => {
    setComment(movies, 'Amazing', 'messi');
    setComment(movies, 'Gooall', 'messi');
    movies.forEach((movie) => {
      if (movie.id === 'messi') {
        expect(commentsCount(movie.comments)).toEqual(2);
      }
    });
  });

  test('Add four comments to a movie with id "ronaldo"', () => {
    setComment(movies, 'Madrid', 'ronaldo');
    setComment(movies, 'Madere', 'ronaldo');
    setComment(movies, 'United', 'ronaldo');
    setComment(movies, 'Juve', 'ronaldo');
    movies.forEach((movie) => {
      if (movie.id === 'ronaldo') {
        expect(commentsCount(movie.comments)).toEqual(4);
      }
    });
  });
});
