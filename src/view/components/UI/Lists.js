import styled from '@emotion/styled';

const MarkedList = styled.ul`
  margin: ${({ theme }) => `${theme.spacing(0.5)}px 0`};
  padding: 0;
  list-style-type: none;
`;

const MarkedListItem = styled.li`
  display: flex;

  &:before {
    content: '';
    display: block;
    width: ${({ theme }) => `${theme.spacing(1)}px`};
    height: 0;
    margin: ${({ theme }) => `${theme.spacing(1)}px ${theme.spacing(1)}px 0 0`};
    border-top: 1px solid ${({ theme }) => theme.palette.primary.normal};
  }
`;

export { MarkedList, MarkedListItem };
