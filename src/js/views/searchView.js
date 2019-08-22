import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
  elements.searchResultList.innerHTML = '';
  elements.searchResPages.innerHTML = '';
};

const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);

    // return the result
    return `${newTitle.join(' ')} ...`;
  }
  return title;
};

const renderRecipe = recipe => {
  const getID = uri => uri.split('#')[1];
  const markup = `      
  <li>
  <a class="results__link" href="#${getID(recipe.recipe.uri)}">
      <figure class="results__fig">
          <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
      </figure>
      <div class="results__data">
          <h4 class="results__name">${limitRecipeTitle(
            recipe.recipe.label
          )}</h4>
          <p class="results__author">${recipe.recipe.source}</p>
      </div>
  </a>
</li> `;

  elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};
// type: 'prev' or 'next'
const createButton = (page, type) =>
  `<button class="btn-inline results__btn--${type}" data-goto=${
    type === 'prev' ? page - 1 : page + 1
  }>
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-${
            type === 'prev' ? 'left' : 'right'
          }">
          </use>
      </svg>
      <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
  </button>`;

const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);
  let button;
  if (page === 1 && pages > 1) {
    // Button to go to next page
    button = createButton(page, 'next');
  } else if (page < pages) {
    // Both buttons
    button = `
    ${createButton(page, 'next')}
    ${createButton(page, 'prev')}`;
  } else if (page === pages && pages > 1) {
    // Button to go to the previous page
    button = createButton(page, 'prev');
  }
  elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  // render results of current page
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;
  recipes.result.slice(start, end).forEach(renderRecipe);
  // render pagination
  renderButtons(page, recipes.result.length, resPerPage);
};
