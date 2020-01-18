import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Row, Col } from 'styled-bootstrap-grid';
import SkeletonRectangle from '../components/UI/SkeletonRectangle';
import Skeleton from '../components/UI/Skeleton';
import { TitleSmall } from '../components/UI/Typography';
import { getGenresState, fetchGenres } from '../../store/ducks/genres';
import appConfig from '../../appConfig';

const GenreWrapper = styled.div`
  margin: 0 0 ${({ theme }) => theme.spacing(2)}px;

  ${({ theme }) => theme.mediaQueries.up('md')} {
    margin: 0;
  }
`;

const GenreLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const GenreName = styled(TitleSmall)`
  display: inline-block;
  color: ${({ theme }) => theme.palette.text.primary};
  text-decoration: none;
  font-weight: 700;
  min-width: 70%;
  margin-bottom: 0;

  ${({ theme }) => theme.mediaQueries.up('md')} {
    margin-bottom: 0;
  }
`;

const GenreImage = styled.img`
  max-width: 100%;
  display: block;
`;

const GenresListPage = () => {
  const NUMBER_OF_SKELETONS = 4;
  const skeletonGenresArr = [...new Array(NUMBER_OF_SKELETONS)];

  const genresState = useSelector(getGenresState);
  const { isLoading, genresList, fetchError } = genresState || {};

  const dispatch = useDispatch();

  useEffect(() => {
    if (!genresList) dispatch(fetchGenres());
  }, [genresList, dispatch]);

  if (!isLoading && !genresList && !fetchError) return null;

  if (fetchError) return <div>{fetchError}</div>;

  return (
    <>
      <Helmet>
        <title>Genres | {appConfig.appName}</title>
      </Helmet>
      <Row>
        {(genresList || skeletonGenresArr).map((genreItem, index) => {
          const { _id, name, img } = genreItem || {};

          const linkTo = `/playlist/genre/${_id}`;

          return (
            <Col sm="6" md="3" key={_id || index}>
              <GenreWrapper>
                {img ? (
                  <Link to={linkTo}>
                    <GenreImage alt={name} src={img} />
                  </Link>
                ) : (
                  <SkeletonRectangle />
                )}
                <GenreName>
                  {!name ? (
                    <Skeleton />
                  ) : (
                    <GenreLink to={linkTo}>{name}</GenreLink>
                  )}
                </GenreName>
              </GenreWrapper>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default GenresListPage;
