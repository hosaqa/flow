import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


const StyledProgressBar = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  cursor: pointer;
`

const ProgressBarEmpty = styled.div`
  height: ${props => (props.direction === 'horizontal') ? '4px' : '100%'};
  width: ${props => (props.direction === 'vertical') ? '4px' : '100%'};
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border-radius: 2px;
  background-color: ${props => props.theme.colorDraggableBg};
  box-shadow: 1px 1px 2px rgba(0, 0, 0, .05);
`

const ProgressBarFill = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: ${props => (props.direction === 'horizontal') ? '4px' : props.filled};
  width: ${props => (props.direction === 'vertical') ? '4px' : props.filled};
  background-image: linear-gradient(154deg, ${props => props.theme.colorGradientStart}, ${props => props.theme.colorGradientEnd});
  border-radius: 2px;
`

const Thumb = styled.div`
  position: absolute;
  right: ${props => props.thumbRadius ? -(props.thumbRadius * 2 - 4)/2 : -2}px;
  top: ${props => props.thumbRadius ? -(props.thumbRadius * 2 - 4)/2 : -2}px;
  width: ${props => props.thumbRadius ? props.thumbRadius * 2 : 8}px;
  height: ${props => props.thumbRadius ? props.thumbRadius * 2 : 8}px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 1px 1px 1px rgba(20, 20, 20, 0.4), -1px -1px 1px rgba(96, 96, 96, 0.25);
`

const ThumbHoverShown = Thumb.extend`
  transition: transform .12s;
  transform: scale(0);
 
  ${StyledProgressBar}:hover & {
    transform: scale(1);
  }
`

const ProgressBar = ({ direction, filled, thumbRadius, thumbShowOnHover }) => (
    <StyledProgressBar>
      <ProgressBarEmpty direction={direction}>
        <ProgressBarFill direction={direction} filled={`${filled}%`}>
          {thumbShowOnHover
            ? <ThumbHoverShown thumbRadius={thumbRadius}/>
            : <Thumb thumbRadius={thumbRadius}/>
          }
          
        </ProgressBarFill>
      </ProgressBarEmpty>
    </StyledProgressBar>
)


export default ProgressBar

ProgressBar.propTypes = {
  direction: PropTypes.string,
  filled: PropTypes.number,
  thumbRadius: PropTypes.number,
  thumbShowOnHover: PropTypes.bool
}
