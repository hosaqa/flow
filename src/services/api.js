import config from '../appConfig';
import { handleResponse } from './utils';

class APIService {
  constructor() {
    this.host = config.API; //TODO import from config!!
  }

  getPlaylist = async uri => {
    const endPoint = `${this.host}/${uri}`;

    try {
      const response = await fetch(endPoint);
      const tracksData = await handleResponse(response);
      // tracksData.playlistData.forEach(i => {
      //   i.src = `${i.src}`a;
      // });
      return tracksData;
    } catch (error) {
      throw new Error(error);
    }
  };

  getGenres = async () => {
    const endPoint = `${this.host}/genres`;

    try {
      const response = await fetch(endPoint);
      const genresData = await handleResponse(response);

      return genresData;
    } catch (error) {
      throw new Error(error);
    }
  };
}

export default new APIService();
