/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/img/logo-transparent.png":
/*!*********************************************!*\
  !*** ./src/assets/img/logo-transparent.png ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"logo-transparent.png\");\n\n//# sourceURL=webpack://api-based-webapp/./src/assets/img/logo-transparent.png?");

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://api-based-webapp/./src/index.css?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ \"./src/index.css\");\n/* harmony import */ var _assets_img_logo_transparent_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/img/logo-transparent.png */ \"./src/assets/img/logo-transparent.png\");\n/* harmony import */ var _modules_api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/api.js */ \"./src/modules/api.js\");\n/* harmony import */ var _modules_involvement_api_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/involvement.api.js */ \"./src/modules/involvement.api.js\");\n\n\n\n\n\nconst movieList = document.querySelector('.movie-list');\nconst movieDetails = document.querySelector('.movie-details');\nconst page = document.documentElement;\nconst searchMovie = document.querySelector('.search-input');\n\n// Function to count number of element on the page\nconst countItems = (arr) => {\n  let count = 0;\n  arr.forEach(() => {\n    count += 1;\n  });\n  const itemCount = document.querySelector('.item-count');\n  itemCount.innerHTML = count;\n  return count;\n};\n\n// Function to get & display lakes on the home page\nconst likeCount = (item, id, index) => {\n  (0,_modules_involvement_api_js__WEBPACK_IMPORTED_MODULE_3__.getLikes)()\n    .then((result) => {\n      let like = 0;\n      result.forEach((data) => {\n        if (data.item_id === id) {\n          like = data.likes;\n        }\n      });\n      return like;\n    })\n    .then((likes) => {\n      document.querySelectorAll('.likes-data').forEach((card, i) => {\n        if (index === i) {\n          card.innerHTML = likes;\n        }\n      });\n    });\n};\n\nconst showComments = async (id) => {\n  (0,_modules_involvement_api_js__WEBPACK_IMPORTED_MODULE_3__.getComments)(id).then((comments) => {\n    let commentsCount = 0;\n    if (comments.length > 0) {\n      comments.forEach((comment) => {\n        commentsCount += 1;\n        const li = document.createElement('li');\n        li.className = 'comment';\n        li.innerHTML = `${comment.creation_date} ${comment.username}: ${comment.comment}`;\n\n        document.querySelector('.comments-list').appendChild(li);\n      });\n    } else {\n      document.querySelector('.comments-list').innerHTML = 'No comments yet!';\n      document.querySelector('.comments-list').className = 'empty';\n    }\n    document.getElementById('comments-count').innerHTML = commentsCount;\n  });\n};\n\nconst displayMovies = (title) => {\n  (0,_modules_api_js__WEBPACK_IMPORTED_MODULE_2__.getData)(title)\n    .then((res) => {\n      movieList.innerHTML = '';\n      res.forEach((movie, i) => {\n        movieList.innerHTML += `<article id=\"${movie.imdbID}\" class=\"movie\">\n                                <img class=\"movie-poster\" src=\"${movie.Poster}\"/>\n                                <div class=\"l-c-buttons\">\n                                    <i class=\"like-btn\">&#x2764; <span class=\"likes-data\"></span></i>\n                                    <button class=\"comment-btn\">Comments</button>\n                                </div>\n                                <p class=\"movie-title\" title=\"${movie.Title}\">${movie.Title}</p>\n                                <ul class=\"type-year\">\n                                    <li class=\"movie-type\">${movie.Type}</li>\n                                    <li class=\"movie-year\">${movie.Year}</li>\n                                </ul>\n                            </article>`;\n        likeCount(movie, movie.imdbID, i);\n      });\n      return res;\n    })\n    .then((movieList) => {\n      countItems(movieList);\n    });\n};\n\nconst showComment = (btn) => {\n  const movieId = btn.parentElement.parentElement.id;\n  const movie = btn.parentElement.nextElementSibling.innerHTML;\n  movieDetails.innerHTML = '';\n  page.classList.add('comment-open');\n  (0,_modules_api_js__WEBPACK_IMPORTED_MODULE_2__.getMovieData)(movie).then((data) => {\n    movieDetails.innerHTML = `\n      <article class=\"movie-popup\">\n        <button class=\"pop-close-btn btn\"><span class=\"pop-close\"></span></button>\n        <section class=\"main-popup-content\">\n          <section class=\"movie-img\">\n            <img class=\"m-poster\" src=\"${data.Poster}\"/>\n          </section>\n          <section class=\"m-title-plot\">\n            <h2 class=\"m-title\">${data.Title}</h2>\n            <ul class=\"type-year\">\n              <li class=\"movie-meta-info\">${data.Type}</li>\n              <li class=\"movie-meta-info\">${data.Year}</li>\n            </ul>\n            <p class=\"m-plot\">${data.Plot}</p>\n            <section class=\"movie-comments\">\n              <h3 class=\"comments-subtitle\">Comments(<span id=\"comments-count\"></span>)</h3>\n              <ul class=\"comments-list list\"></ul>\n              <h3 class=\"comments-subtitle\">Add a comment</h3>\n              <form action=\"#\" id=\"add-comment-form\" class=\"${movieId}\">\n                <ul class=\"input-list list\">\n                  <li class=\"input-list-item\">\n                    <input type=\"text\" name=\"name\" id=\"name\" class=\"name-input input\" placeholder=\"Your name\"/>\n                  </li>\n                  <li class=\"input-list-item\">\n                    <textarea name=\"comment\" id=\"comment\" class=\"comment-input input\" placeholder=\"Give us your thoughts...\"></textarea>\n                  </li>\n                  <li class=\"input-list-item\">\n                    <button type=\"submit\" class=\"comment-submit btn\">Comment</button>\n                  </li>\n                </ul>\n              </form>\n            </section>\n          </section>\n        </section>\n      </article>`;\n  });\n  showComments(movieId);\n};\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  displayMovies('marvel');\n});\n\nsearchMovie.addEventListener('input', () => {\n  if (searchMovie.value === '') {\n    displayMovies('marvel');\n  } else {\n    displayMovies(searchMovie.value);\n  }\n});\n\ndocument.addEventListener('click', (e) => {\n  if (e.target && e.target.classList.contains('comment-btn')) {\n    showComment(e.target);\n  }\n\n  if (e.target && (e.target.classList.contains('pop-close-btn') || e.target.classList.contains('pop-close'))) {\n    page.classList.remove('comment-open');\n  }\n});\n\ndocument.addEventListener('submit', (e) => {\n  if (e.target && e.target.id === 'add-comment-form') {\n    e.preventDefault();\n    const identifier = e.target.className;\n    (0,_modules_involvement_api_js__WEBPACK_IMPORTED_MODULE_3__.setComment)(identifier, document.querySelector('.comment-input').value, document.querySelector('.name-input').value);\n    e.target.reset();\n  }\n});\n\n\n//# sourceURL=webpack://api-based-webapp/./src/index.js?");

/***/ }),

/***/ "./src/modules/api.js":
/*!****************************!*\
  !*** ./src/modules/api.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getData\": () => (/* binding */ getData),\n/* harmony export */   \"getMovieData\": () => (/* binding */ getMovieData)\n/* harmony export */ });\nconst getData = async (movie) => {\n  const key = 'e7db26be';\n\n  const data = await fetch(`https://www.omdbapi.com/?s=${movie}&apikey=${key}`);\n  const moviesInfo = await data.json();\n  return moviesInfo.Search;\n};\n\nconst getMovieData = async (movie) => {\n  const key = 'e7db26be';\n\n  const data = await fetch(`https://www.omdbapi.com/?t=${movie}&plot=full&apikey=${key}`);\n  const moviesInfo = await data.json();\n  return moviesInfo;\n};\n\n\n\n//# sourceURL=webpack://api-based-webapp/./src/modules/api.js?");

/***/ }),

/***/ "./src/modules/involvement.api.js":
/*!****************************************!*\
  !*** ./src/modules/involvement.api.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getComments\": () => (/* binding */ getComments),\n/* harmony export */   \"getLikes\": () => (/* binding */ getLikes),\n/* harmony export */   \"setComment\": () => (/* binding */ setComment)\n/* harmony export */ });\nconst getLikes = async () => {\n  const appID = 'YUqI88f5a8VwBEjald5b';\n  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/likes`);\n  const likes = await response.json();\n  return likes;\n};\n\nconst getComments = async (movieID) => {\n  const appID = 'YUqI88f5a8VwBEjald5b';\n  const res = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/comments?item_id=${movieID}`);\n  const comments = await res.json();\n  return comments;\n};\n\nconst setComment = async (movieID, comment, name) => {\n  const data = {\n    item_id: movieID,\n    username: name,\n    comment,\n  };\n  const appID = 'YUqI88f5a8VwBEjald5b';\n  const res = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/comments`, {\n    method: 'POST',\n    body: JSON.stringify(data),\n    headers: {\n      'Content-Type': 'application/json',\n    },\n  });\n  const status = await res.json();\n  return status;\n};\n\n\n\n\n//# sourceURL=webpack://api-based-webapp/./src/modules/involvement.api.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;