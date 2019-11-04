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
      this.title = res.data[0].label;
      this.author = res.data[0].source;
      this.img = res.data[0].image;
      this.url = res.data[0].url;
      this.ingredients = res.data[0].ingredients;

      console.log(res);
    } catch (error) {
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

  parseIngredients() {
    const unitsLong = [
      'tablespoons',
      'tablespoon',
      'ounces',
      'ounce',
      'teaspoons',
      'teaspoon',
      'cups',
      'pounds',
    ];
    const unitsShort = [
      'tbsp',
      'tbsp',
      'oz',
      'oz',
      'tsp',
      'tsp',
      'cup',
      'pound',
    ];
    const units = [...unitsShort, 'kg', 'g'];
    const newIngredients = this.ingredients.map(el => {
      // Uniform units
      // let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      // Remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      // Parse ingredients into count, unit & ingredient
      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

      let objIng;
      if (unitIndex > -1) {
        // There is a unit
        // example 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") ---> 4.5
        // example 4, arrCount is [4]
        const arrCount = arrIng.slice(0, unitIndex);

        let count;
        if (arrCount.length === -1) {
          count = eval(arrIng[0].replace('-', '+'));
        } else {
          count = eval(arrIng.slice(0, unitIndex).join('+'));
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' '),
        };
      } else if (parseInt(arrIng[0], 10)) {
        // There is no unit but 1st element is a number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(' '),
        };
      } else if (unitIndex === -1) {
        // There is no unit and no number in the 1st position
        objIng = {
          count: 1,
          unit: '',
          ingredient,
        };
      }

      return objIng;
    });
    this.ingredients = newIngredients;
  }
}
