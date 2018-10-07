import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Scrollable from '../Scrollable'

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
      <Scrollable>
        { children }
      </Scrollable>
    </PlaylistQueueBody>
  </PlaylistQueueWrapper>
)

PlaylistQueue.propTypes = {
  children: PropTypes.node
}

export default PlaylistQueue