import styled from '@emotion/styled';

const TitleLarge = styled.div`
  font-weight: 700;
  font-size: ${({ theme }) => theme.spacing(4)}px;
  margin: ${({ theme }) => theme.spacing(2)}px 0;

  ${({ theme }) => theme.mediaQueries.up('md')} {
    font-size: ${({ theme }) => theme.spacing(6)}px;
    margin: ${({ theme }) => theme.spacing(3)}px 0;
  }
`;

const TitleMedium = styled.div`
  font-weight: 700;
  font-size: ${({ theme }) => theme.spacing(2.5)}px;
  margin: ${({ theme }) => theme.spacing(1.5)}px 0;

  ${({ theme }) => theme.mediaQueries.up('md')} {
    font-size: ${({ theme }) => theme.spacing(4)}px;
    margin: ${({ theme }) => theme.spacing(2.5)}px 0;
  }
`;

const TitleSmall = styled.div`
  font-weight: 700;
  font-size: ${({ theme }) => theme.spacing(2.25)}px;
  margin: ${({ theme }) => theme.spacing(1)}px 0;

  ${({ theme }) => theme.mediaQueries.up('md')} {
    font-size: ${({ theme }) => theme.spacing(3.5)}px;
    margin: ${({ theme }) => theme.spacing(1.5)}px 0;
  }
`;

export { TitleLarge, TitleMedium, TitleSmall };
