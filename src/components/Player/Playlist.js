import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

const ListWrap = styled.div`
  position: relative;
`

const List = styled.div`
  position: absolute;
  bottom: 100px;
  right: 0;
` 

export default class Playlist extends Component {
  static propTypes = {
    playlist: PropTypes.array
  }

  render() {
    console.log(this.props)
    const test = (playlist) => {
      console.log(playlist)
      return playlist.map((item, key) => <div>{item.track}</div>)
    } 

    return (
      <ListWrap>
        <List>
          {test(this.props.playlist)}
        </List>
      </ListWrap>
    )
  }
}
