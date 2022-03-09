/**
 * @jest-environment jsdom
 */

import countItems from './modules/_mocks_/countItemsFunc.js';

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
