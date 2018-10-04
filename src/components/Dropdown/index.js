import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { TransitionGroup } from 'react-transition-group'
import transition from "styled-transition-group"

const DropdownWrapper = styled.div`
  position: relative;
`

const DropdownSelector = styled.div`
  position: relative;
`

const DropdownContent = styled.div`
  display: block;
`
const DropdownContentAnimated = transition(DropdownContent).attrs({
  timeout: 200
})`
  transform-origin: right bottom;

  &:enter {
    opacity: 0.01;
    transform: scale(.92);
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
    transform: scale(.92);
    transition: opacity 150ms ease-in, transform 150ms ease-in;
  }
`

export default class Dropdown extends Component {
  state = {
    isOpen: false
  }

  getDropdownRef = node => {
    return this.dropdown = node
  }

  handleClickOutside = (ev) => {
    const dropdownNode = findDOMNode(this.dropdown)
    !dropdownNode.contains(ev.target) && this.setState({isOpen: false})
  }

  handleSelectorClick = () => {
    this.setState({
      isOpen: !this.state.isOpen
    }, () => {
      this.state.isOpen
      ? document.addEventListener('click', this.handleClickOutside)
      : document.removeEventListener('click', this.handleClickOutside)
    })
  }


  render() {
    const { selector, children } = this.props
    const { isOpen } = this.state

    return (
      <DropdownWrapper
        ref={this.getDropdownRef}
      >
        <DropdownSelector onClick={this.handleSelectorClick}>
          {selector}
        </DropdownSelector>
        <TransitionGroup>
          {
            isOpen &&
            <DropdownContentAnimated>
              {children}
            </DropdownContentAnimated>
          }
        </TransitionGroup>
      </DropdownWrapper>
    )
  }
}

Dropdown.propTypes = {
  selector: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired
}