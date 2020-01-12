import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import APIService from '../../services/api';

const GenresListPage = () => {
  const [genres, setGenres] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        const data = await APIService.getGenres();
        setGenres(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {genres &&
        genres.length &&
        genres.map(item => (
          <div
            style={{ display: 'inline-block', marginRight: '16px' }}
            key={item._id}
          >
            <img width="200" height="200" alt={item.name} src={item.img} />
            <div
              style={{
                fontSize: '24px',
                fontWeight: '700',
                margin: '15px 0 0',
              }}
            >
              <Link to={`/playlist/genre/${item._id}`}>{item.name}</Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default GenresListPage;
