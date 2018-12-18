import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ScrollArea from 'react-scrollbar'
import './style.css'

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
      <ScrollArea
        speed={0.8}
        smoothScrolling={true}
        className="area"
        contentClassName="content"
        horizontal={false}
        style={{
          padding: '0 10px 0 0'
        }}
        verticalScrollbarStyle={{
          borderRadius: '4px'
        }}
      >
        { children }
      </ScrollArea>
    </PlaylistQueueBody>
  </PlaylistQueueWrapper>
)

PlaylistQueue.propTypes = {
  children: PropTypes.node
}

export default PlaylistQueue