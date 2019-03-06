import React from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getMousePosition } from '../utils'

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  cursor: ${({disabled}) => disabled ? 'default' : 'pointer'};
  pointer-events: ${({disabled}) => disabled ? 'none' : 'auto'};
  padding: 7px 0;
`

const TrackArea = styled.div`
  height: ${({axis}) => (axis === 'x') ? '4px' : '100%'};
  width: ${({axis}) => (axis === 'y') ? '4px' : '100%'};
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border-radius: 2px;
  background-color: ${({disabled, theme}) => disabled ? theme.colors.buttonDisabled: theme.colorDraggableBg};
  box-shadow: ${({active}) => active ? '2px 2px 2px rgba(0, 0, 0, .1)' : 'none'};
  transition: box-shadow .35s, background-color .25s;
`

const FilledArea = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: ${({axis, filled}) => (axis === 'x') ? '4px' : filled};
  width: ${({axis, filled}) => (axis === 'y') ? '4px' : filled};
  background-image: linear-gradient(154deg, ${({theme}) => theme.colors.accentPrimary}, ${({theme}) => theme.colors.accentSecondary});
  border-radius: 2px;
`

const Thumb = styled.div`
  position: absolute;
  right: ${({thumbRadius}) => thumbRadius ? -(thumbRadius * 2 - 4)/2 : -2}px;
  top: ${({thumbRadius}) => thumbRadius ? -(thumbRadius * 2 - 4)/2 : -2}px;
  width: ${({thumbRadius}) => thumbRadius ? thumbRadius * 2 : 8}px;
  height: ${({thumbRadius}) => thumbRadius ? thumbRadius * 2 : 8}px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 1px 1px 1px rgba(20, 20, 20, 0.4), -1px -1px 1px rgba(96, 96, 96, 0.25);
  transition: transform .12s;
  transform: ${(thumbShowOnHover) => thumbShowOnHover ? 'scale(1)' : 'scale(0)'};
 
  ${Wrapper}:hover & {
    transform: scale(1);
  }
`


const Drag = ({ disabled, active, axis, filled, thumbRadius, thumbShowOnHover }) => {
  const ref = React.createRef();
  const onClickHandler = e => {
    console.log(e ,ref);
    console.log(getMousePosition(e, ref))
  }

  const setPosition = val => {

  }

  const eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };

  return (

    <Wrapper
      disabled={disabled}
      onClick={onClickHandler}
      ref={ref}
    >
      <TrackArea
        disabled={disabled}
        active={active}
        axis={axis}
        click={onClickHandler}
      >
        { !disabled &&
          <div>
            <FilledArea
              axis={axis}
              filled={`${filled}%`}
            />
            <Draggable
              axis={axis}
              handle=".draggable-handle"
              defaultPosition={{x: 0, y: 0}}
              position={{x: 100, y: 0}}
              scale={1}
              bounds={'parent'}
              onStart={eventLogger}
              onDrag={eventLogger}
            >
              <div className='draggable-handle' style={{width: '1px', height: '1px'}}>
                <Thumb
                  thumbRadius={thumbRadius}
                  thumbShowOnHover={thumbShowOnHover}
                />
              </div>
            </Draggable>
          </div>
        }
      </TrackArea>
    </Wrapper>
  )
}
 
export default Drag