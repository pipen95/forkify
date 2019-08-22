import axios from 'axios';
import { baseURL, apiKey, appID } from '../config';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const results = await axios(`
      ${baseURL}/search?q=${this.query}
      &from=0&to=50&app_id=${appID}&app_key=${apiKey}`);
      this.result = results.data.hits;
    } catch (error) {
      alert(error);
    }
  }
}
