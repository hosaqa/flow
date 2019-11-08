import styled from '@emotion/styled';

const TimeLabel = styled.div`
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  width: ${({ theme }) => theme.spacing(4)}px;
  user-select: none;
  font-size: ${({ theme }) => theme.spacing(1.75)}px;
  transition: color ${({ theme }) => theme.transitions.short}ms;
  color: ${({ theme, disabled }) =>
    disabled ? theme.palette.action.disabled : theme.palette.text.primary};
`;

export default TimeLabel;
