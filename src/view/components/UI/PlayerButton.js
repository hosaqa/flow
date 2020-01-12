import styled from '@emotion/styled';

const PlayerButton = styled.button`
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-user-select: none;
  -webkit-appearance: none;
  touch-action: manipulation;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  position: relative;
  border: 0;
  padding: 0;
  margin-left: ${({ theme }) => theme.spacing(0.5)}px;
  margin-right: ${({ theme }) => theme.spacing(0.5)}px;
  outline: none;
  background-color: transparent;
  color: ${({ activated, disabled, theme }) =>
    disabled
      ? theme.palette.action.disabled
      : activated
      ? theme.palette.primary.normal
      : theme.palette.text.primary};
  transition: color ${({ theme }) => theme.transitions.default}ms,
    transform ${({ theme }) => theme.transitions.short}ms;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:active {
    transform: scale(1.25);
  }

  &[data-focus-visible-added]:focus {
    outline: ${({ theme }) => `${theme.palette.action.focus} solid 3px`};
    outline-offset: 1px;
  }

  svg {
    vertical-align: middle;
    pointer-events: none;
    font-size: ${({ theme, iconSize }) =>
      iconSize === 'large' ? theme.spacing(4) : theme.spacing(3)}px;
  }
`;

export default PlayerButton;
