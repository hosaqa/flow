import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Draggable from '../Draggable'

const PlaylistQueueWrapper = styled.div`
  position: absolute;
  bottom: 90px;
  right: 0;
`

const PlaylistQueueBody = styled.div`
  width: 450px;
  height: 300px;
  padding: 0;
  text-align: left;
  border-radius: ${props => props.theme.borderRadiusMain};
  background-color: ${props => props.theme.colorMainBg};
  box-shadow: ${props => props.theme.shadowMain};
`

const PlaylistQueue = ({children}) => (
  <PlaylistQueueWrapper>
    <PlaylistQueueBody>
      <Draggable height={280}>
        { children }
      </Draggable>
    </PlaylistQueueBody>
  </PlaylistQueueWrapper>
)

PlaylistQueue.propTypes = {

}

export default PlaylistQueue