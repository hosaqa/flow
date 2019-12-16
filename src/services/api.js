class APIService {
  constructor() {
    this.host = 'localhost:8000';
  }

  getTracks = (limit, genre, artist) => {
    const limitParam = limit ? `limit=${limit}` : '';
    const genreParam = genre ? `genre=${genre}` : '';
    const artistParam = genre ? `artist=${artist}` : '';

    let endPoint = `${this.host}tracks`;
    endPoint;
  };
}

export default APIService();
