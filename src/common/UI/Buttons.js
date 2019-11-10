import styled from '@emotion/styled';

const ButtonDefault = styled.button`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  border: 0;
  padding: 0;
  background-color: transparent;
  box-shadow: none;
  cursor: pointer;
  user-select: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  touch-action: manipulation;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:disabled,
  [disabled='disabled'] {
    pointer-events: none;
  }

  &:focus {
    outline: 0;
  }
`;

export { ButtonDefault };
