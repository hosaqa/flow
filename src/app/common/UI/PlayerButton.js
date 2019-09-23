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
  color: ${({ active, disabled, theme }) =>
    disabled
      ? theme.colors.buttonDisabled
      : active
      ? theme.colors.theme
      : theme.colors.button};
  transition: color 0.25s, transform 0.15s;

  &:hover {
    color: ${({ disabled, hoverDisabled, theme }) =>
      !hoverDisabled && !disabled ? theme.colors.theme : null};
  }

  &:active {
    & > svg {
      color: ${({ theme, pseudoSelActive, disabled }) =>
        pseudoSelActive && !disabled ? theme.colors.theme : null};
    }
  }

  & > svg {
    vertical-align: middle;
    pointer-events: none;
    font-size: ${({ theme, iconSize }) =>
      iconSize ? `${iconSize}px` : theme.spacing(3)};
  }
`;

export default PlayerButton;
