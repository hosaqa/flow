import styled from '@emotion/styled';

const PlayerButton = styled.button`
  -webkit-user-select: none;
  -webkit-appearance: none;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  position: relative;
  padding: 0;
  margin-left: ${({ theme }) => theme.spacing(0.5)};
  margin-right: ${({ theme }) => theme.spacing(0.5)};
  border: 0;
  outline: none;
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

  &[data-focus-visible-added]:focus {
    outline: rgba(131, 192, 253, 0.5) solid 3px;
    outline-offset: 1px;
  }

  & > svg {
    vertical-align: middle;
    pointer-events: none;
    font-size: ${({ theme, iconSize }) =>
      iconSize ? `${iconSize}px` : theme.spacing(3)};
  }
`;

export default PlayerButton;
