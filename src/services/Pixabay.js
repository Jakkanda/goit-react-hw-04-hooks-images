import axios from 'axios';

class PixabayAPIService {
  constructor() {
    this.client = axios.create({
      baseURL: 'https://pixabay.com/api',
      responseType: 'json',
    });
    this.key = '21755043-d9575a6749b270eceb64a1173';
  }
  async getImages(searchString, page) {
    try {
      const response = await this.client
        .get(`?q=${searchString}&page=${page}&key=${this.key}&image_type=photo&orientation=horizontal&per_page=12
    `);
      return response.data.hits;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default new PixabayAPIService();
