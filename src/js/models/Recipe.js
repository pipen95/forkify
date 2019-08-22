import axios from 'axios';
import { recipeURL, apiKey, appID, baseURL } from '../config';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const recipeID = encodeURIComponent(`${recipeURL}${this.id}`);
      const res = await axios(
        `${baseURL}/search?r=${recipeID}&app_id=${appID}&app_key=${apiKey}`
      );
      this.title = res.data.label;
      this.author = res.data[0].source;
      this.img = res.data[0].image;
      this.url = res.data[0].url;
      this.ingredients = res.data[0].ingredients;
      console.log(res);
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  }

  calcTime() {
    // Asssuming that we need 15min for each 3 ingredients
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calServings() {
    this.servings = 4;
  }
}
