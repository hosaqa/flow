import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Button = styled.button`
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

  &:focus {
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

const PlayerButton = props => {
  const [focused, setFocused] = useState(false);
  const buttonRef = useRef(null);

  const handleClick = e => {
    buttonRef.current.blur();

    if (props.onClick) props.onClick(e);
  };

  const handleMouseDown = e => {
    e.preventDefault();
    buttonRef.current.blur();
    buttonRef.current.focusf();

    if (props.onMouseDown) props.onMouseDown(e);
  };

  return (
    <Button
      ref={buttonRef}
      {...props}
      focused={focused}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    >
      {props.children}
    </Button>
  );
};

PlayerButton.propTypes = {
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  children: PropTypes.node,
};

export default PlayerButton;
