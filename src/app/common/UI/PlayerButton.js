import styled from '@emotion/styled';

const PlayerButton = styled.button`
  -webkit-user-select: none;
  -webkit-appearance: none;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  position: relative;
  padding: 0 6px;
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
    font-size: ${({ iconSize }) => (iconSize ? `${iconSize}px` : '24px')};
  }
`;

export default PlayerButton;
