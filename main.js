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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ \"./src/index.css\");\n/* harmony import */ var _modules_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/api.js */ \"./src/modules/api.js\");\n\n\n\nconst movieList = document.querySelector('.movie-list');\nconst movieDetails = document.querySelector('.movie-details');\nconst page = document.documentElement;\n\n// Function to count number of element on the page\nconst countItems = (arr) => {\n  let count = 0;\n  arr.forEach(() => {\n    count += 1;\n  });\n  const itemCount = document.querySelector('.item-count');\n  itemCount.innerHTML = count;\n  return count;\n};\n\nconst displayMovies = (title) => {\n  (0,_modules_api_js__WEBPACK_IMPORTED_MODULE_1__.getData)(title)\n    .then((res) => {\n      res.forEach((movie) => {\n        movieList.innerHTML += `<article class=\"movie\">\n                                <img class=\"movie-poster\" src=\"${movie.Poster}\"/>\n                                <div class=\"l-c-buttons\">\n                                    <i class=\"like-btn\">&#x2764;</i>\n                                    <button class=\"comment-btn\">Comment</button>\n                                </div>\n                                <p class=\"movie-title\">${movie.Title}</p>\n                                <ul class=\"type-year\">\n                                    <li class=\"movie-type\">${movie.Type}</li>\n                                    <li class=\"movie-year\">${movie.Year}</li>\n                                </ul>\n                            </article>`;\n      });\n      return res;\n    })\n    .then((movieList) => {\n      countItems(movieList);\n    });\n};\n\nconst showComment = (btn) => {\n  const movie = btn.parentElement.nextElementSibling.innerHTML;\n  movieDetails.innerHTML = '';\n  page.classList.add('comment-open');\n  (0,_modules_api_js__WEBPACK_IMPORTED_MODULE_1__.getMovieData)(movie).then((data) => {\n    movieDetails.innerHTML = `<button class=\"pop-close-btn btn\"><span class=\"pop-close\"></span></button>\n      <article class=\"m\">\n        <img class=\"m-poster\" src=\"${data.Poster}\"/>\n        <div class=\"m-title-plot\">\n            <p class=\"m-title\">${data.Title}</p>\n            <p class=\"m-plot\">${data.Plot}</p>\n        </div>\n        <ul class=\"type-year\">\n            <li class=\"movie-type\">${data.Type}</li>\n            <li class=\"movie-year\">${data.Year}</li>\n        </ul>\n      </article>`;\n  });\n};\n\ndocument.addEventListener('DOMContentLoaded', displayMovies('marvel'));\n\ndocument.addEventListener('click', (e) => {\n  if (e.target && e.target.classList.contains('comment-btn')) {\n    showComment(e.target);\n  }\n\n  if (e.target && e.target.classList.contains('pop-close-btn')) {\n    page.classList.remove('comment-open');\n  }\n});\n\n\n//# sourceURL=webpack://api-based-webapp/./src/index.js?");

/***/ }),

/***/ "./src/modules/api.js":
/*!****************************!*\
  !*** ./src/modules/api.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getData\": () => (/* binding */ getData),\n/* harmony export */   \"getMovieData\": () => (/* binding */ getMovieData)\n/* harmony export */ });\nconst getData = async (movie = 'the flash') => {\n  const key = 'e7db26be';\n\n  const data = await fetch(`https://www.omdbapi.com/?s=${movie}&apikey=${key}`);\n  const moviesInfo = await data.json();\n  return moviesInfo.Search;\n};\n\nconst getMovieData = async (movie) => {\n  const key = 'e7db26be';\n\n  const data = await fetch(`https://www.omdbapi.com/?t=${movie}&plot=full&apikey=${key}`);\n  const moviesInfo = await data.json();\n  return moviesInfo;\n};\n\n\n\n//# sourceURL=webpack://api-based-webapp/./src/modules/api.js?");

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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;