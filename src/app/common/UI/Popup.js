import styled from '@emotion/styled/macro';

const Popup = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius(2)};
  background-color: ${({ theme }) => theme.palette.background.secondary};
  box-shadow: ${({ theme }) => theme.shadows.primary};
`;

export default Popup;
