import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const DropdownWrapper = styled.div`
  position: relative;
`

const DropdownSelector = styled.div`
  position: relative;
`

const DropdownMain = styled.div`
  display: ${props => props.visible ? 'block' : 'none'};
`


export default class Dropdown extends Component {
  state = {
    isOpened: false
  }

  handleClick = () => {
    this.setState({
      isOpened: !this.state.isOpened
    })
  }

  clickDo() {
    console.log(this.element)
  }

  render() {
    const { selector, children } = this.props
    this.clickDo()
    return (
      <DropdownWrapper ref={(node) => {this.element = node}}>
        <div onClick={this.handleClick}>
          {selector}
        </div>
        <DropdownMain visible={this.state.isOpened}>
          {children}
        </DropdownMain>
      </DropdownWrapper>
    )
  }
}

Dropdown.propTypes = {

}