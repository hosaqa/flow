import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Row, Col } from 'styled-bootstrap-grid';
import APIService from '../../services/api';

const GenreWrapper = styled.div`
  margin: 0 0 ${({ theme }) => theme.spacing(2)}px;

  ${({ theme }) => theme.mediaQueries.up('md')} {
    margin: 0;
  }
`;

const GenreLink = styled(Link)`
  color: ${({ theme }) => theme.palette.text.primary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.spacing(2)}px;
  font-weight: 700;

  ${({ theme }) => theme.mediaQueries.up('md')} {
    font-size: ${({ theme }) => theme.spacing(3)}px;
  }
`;

const GenreImage = styled.img`
  max-width: 100%;
  display: block;
  margin: 0 0 ${({ theme }) => theme.spacing(1)}px;

  ${({ theme }) => theme.mediaQueries.up('md')} {
    margin: 0 0 ${({ theme }) => theme.spacing(1.5)}px;
  }
`;

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
    <Row>
      {genres &&
        genres.length &&
        genres.map(item => {
          const linkTo = `/playlist/genre/${item._id}`;

          return (
            <Col sm="6" md="3" key={item._id}>
              <GenreWrapper>
                <Link to={linkTo}>
                  <GenreImage alt={item.name} src={item.img} />
                </Link>
                <GenreLink to={linkTo}>{item.name}</GenreLink>
              </GenreWrapper>
            </Col>
          );
        })}
    </Row>
  );
};

export default GenresListPage;
