import { handleResponse, createStringParams } from './utils';

class APIService {
  constructor() {
    this.host = 'http://localhost:8000'; //TODO import from config!!
  }

  getPlaylist = async uri => {
    const endPoint = `${this.host}/${uri}`;

    try {
      const response = await fetch(endPoint);
      const tracksData = await handleResponse(response);

      return tracksData;
    } catch (error) {
      return error;
    }
  };

  getTracks = async (options = {}) => {
    const { limit, genre, artist } = options;

    const stringParams = createStringParams({
      limit,
      genre,
      artist,
    });

    const endPoint = `${this.host}/tracks${stringParams}`;

    try {
      const response = await fetch(endPoint);
      const tracksData = await handleResponse(response);

      return tracksData;
    } catch (error) {
      return error;
    }
  };
}

export default new APIService();
