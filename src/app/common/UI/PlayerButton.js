import styled from '@emotion/styled';

const PlayerButton = styled.button`
  -webkit-user-select: none;
  -webkit-appearance: none;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  position: relative;
  padding-left: ${({ theme }) => theme.spacing(0.5)};
  padding-right: ${({ theme }) => theme.spacing(0.5)};
  border: 0;
  outline: 0;
  background-color: transparent;
  color: ${({ activated, disabled, theme }) =>
    disabled
      ? theme.colors.buttonDisabled
      : activated
      ? theme.colors.primary
      : theme.colors.button};
  transition: color 0.25s, transform 0.15s;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  
  /* &:focus {
    color: ${({ theme }) => theme.colors.primary};
  } */

  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
    -webkit-box-shadow: 0 0 0 20px transparent, inset 0 0 0 1px transparent;
    box-shadow: 0 0 0 20px transparent, inset 0 0 0 1px transparent;
    -webkit-transition: none;
    transition: none;
    border-radius: 500px;
  }

  & > svg {
    vertical-align: middle;
    pointer-events: none;
    font-size: ${({ theme, iconSize }) =>
      iconSize ? `${iconSize}px` : theme.spacing(3)};
  }
`;

export default PlayerButton;
