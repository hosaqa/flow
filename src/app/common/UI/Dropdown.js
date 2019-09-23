import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { TransitionGroup } from 'react-transition-group';
import transition from 'styled-transition-group';

const DropdownWrapper = styled.div`
  position: relative;
`;
const DropdownSelector = styled.div`
  position: relative;
`;

const DropdownContent = styled.div`
  display: block;
`;
const DropdownContentAnimated = transition(DropdownContent).attrs({
  timeout: 200,
})`
  transform-origin: right bottom;

  &:enter {
    opacity: 0.01;
    transform: scale(.97);
  }

  &:enter-active {
    opacity: 1;
    transition: opacity 200ms ease-in, transform 200ms ease-in;
    transform: scale(1);
  }

  &:exit {
    opacity: 1;
    transform: scale(1);
  }
  
  &:exit-active {
    opacity: 0.01;
    transform: scale(.97);
    transition: opacity 150ms ease-in, transform 150ms ease-in;
  }
`;

export default class Dropdown extends Component {
  state = {
    isOpen: false,
  };

  getDropdownRef = node => {
    this.dropdown = node;
  };

  handleClickOutside = ev =>
    !this.dropdown.contains(ev.target) && this.setState({ isOpen: false });

  handleSelectorClick = () => {
    this.setState(
      prevState => ({
        isOpen: !prevState.isOpen,
      }),
      () => {
        const { isOpen } = this.state;
        if (isOpen) {
          document.addEventListener('click', this.handleClickOutside);
        } else {
          document.removeEventListener('click', this.handleClickOutside);
        }
      }
    );
  };

  render() {
    const { selector, children } = this.props;
    const { isOpen } = this.state;

    return (
      <DropdownWrapper ref={this.getDropdownRef}>
        <DropdownSelector onClick={this.handleSelectorClick}>
          {selector}
        </DropdownSelector>
        <TransitionGroup timeout={200}>
          {isOpen && (
            <DropdownContentAnimated timeout={200}>
              {children}
            </DropdownContentAnimated>
          )}
        </TransitionGroup>
      </DropdownWrapper>
    );
  }
}

Dropdown.propTypes = {
  selector: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};
