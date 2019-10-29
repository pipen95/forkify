import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/**  Global state of the app
 * -Search object
 * -Current recipe object
 * -shopping list object
 */

const state = {};
// console.log(state);

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
  // Get query from view
  const query = searchView.getInput(); // TODO

  if (query) {
    // 2) New search object and add to state
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchResult);

    try {
      // 4) Search for recipes
      await state.search.getResults();

      // 5) render results on UI
      clearLoader();
      searchView.renderResults(state.search);
    } catch (err) {
      alert('Something wrong with the search');
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener('click', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search, goToPage);
  }
});

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
  // Get ID from url
  const id = window.location.hash.replace('#', '');
  console.log(id);

  if (id) {
    // Prepare UI for changes

    // Create new recipe object
    state.recipe = new Recipe(id);

    try {
      // Get recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // Calulate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe
      // console.log(state.recipe);
    } catch (err) {
      alert('Error processing recipe!');
    }
  }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

// Easy fix for above
['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));
