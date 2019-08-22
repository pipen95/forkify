import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/**  Global state of the app
 * -Search object
 * -Current recipe object
 * -shopping list object
 */

/**
  * GLOBAL STATE
  * /

const state = {};

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

    // 3) Search for recipes
    await state.search.getResults();

    // 5) render results on UI
    clearLoader();
    searchView.renderResults(state.search);
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
const r = new Recipe('recipe_57402ed28fdd337dc28684791a231f17');
r.getRecipe();
console.log(r);
