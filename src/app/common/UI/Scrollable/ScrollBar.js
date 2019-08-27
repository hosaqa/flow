/* eslint-disable */
// когда-нибудь доделаю
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import styled from '@emotion/styled';
import { Motion, spring } from 'react-motion';

import { getMousePosition } from '../../utils';

const Wrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 8px;
  background-color: #d0d0d0;
  box-shadow: -1px 0 1px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
`;

const Track = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: ${({ trackHeight }) => trackHeight}px;
  width: 100%;
`;

const Thumb = styled.div`
  position: absolute;
  right: 0;
  top: ${({ thumbPosition }) => thumbPosition}%;
  height: ${({ thumbHeight }) => thumbHeight}px;
  width: 100%;
  background-color: #ff7777;
  transition: background-color 0.2s;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  &:hover {
    background-color: red;
  }
`;

export default class ScrollBar extends Component {
  state = {
    thumbHeight: null,
    dragged: false,
    pointStartDrag: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.viewportHeight !== this.props.viewportHeight) {
      this.setState({
        thumbHeight: this.getThumbHeight(),
      });
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handler);

    document.addEventListener('mouseup', () => {
      if (this.state.dragged) {
        document.removeEventListener('mousedown', this.handler);
      }
    });
  }

  handler = ev => {
    if (ev.target === findDOMNode(this._thumbNode)) {
      this.drag(ev);
    }
  };

  drag = ev => {
    if (!this.state.dragged) return false;
    if (!this.state.pointStartDrag) {
      this.setState({
        pointStartDrag: ev.screenY,
      });
    } else {
      this.setState({
        pointStartDrag: null,
      });
    }
  };

  dragMove = delta => {
    this.setState({
      pointStartDrag: null,
    });
    this.props.scrollTo(this.props.contentPosition - delta);
  };

  getThumbHeight = () => {
    const { viewportHeight, contentHeight } = this.props;

    return Math.round((viewportHeight / contentHeight) * viewportHeight);
  };

  getThumbPosition = () => {
    const { viewportHeight, contentPosition, contentHeight } = this.props;

    return (
      (Math.abs(contentPosition) / (contentHeight - viewportHeight)) *
      100
    ).toFixed(2);
  };

  thumbClickHandler = ev => {
    ev.stopPropagation();
  };

  BarClickHandler = (ev, ref) => {
    const { contentPosition, contentHeight, scrollTo } = this.props;

    const { topPosition } = getMousePosition(ev, ref);
    const scrollDown =
      parseFloat(topPosition * 100).toFixed(2) >
      parseFloat(this.getThumbPosition());

    const delta = scrollDown ? contentHeight / 10 : contentHeight / -10;

    scrollTo(contentPosition + delta);
  };

  handleOnMouseDown = ev => {
    window.addEventListener('mousemove', this.drag);

    this.setState({
      dragged: true,
    });
  };

  handleOnMouseUp = ev => {
    window.removeEventListener('mousemove', this.drag);
    this.setState({
      dragged: false,
      pointStartDrag: null,
    });
  };

  getTrackRef = node => {
    this.track = node;
  };

  render() {
    const { viewportHeight } = this.props;
    const { thumbHeight } = this.state;

    const barRef = React.createRef();

    return (
      <Wrapper ref={barRef} onClick={ev => this.BarClickHandler(ev, barRef)}>
        <Track
          ref={this.getTrackRef}
          trackHeight={viewportHeight - thumbHeight}
        >
          <Motion
            defaultStyle={{ top: 0 }}
            style={{ top: spring(parseFloat(this.getThumbPosition())) }}
          >
            {interpolatedStyle => (
              <Thumb
                ref={node => {
                  this._thumbNode = node;
                }}
                onClick={this.thumbClickHandler}
                onMouseDown={this.handleOnMouseDown}
                onMouseUp={this.handleOnMouseUp}
                thumbHeight={thumbHeight}
                thumbPosition={interpolatedStyle.top}
              />
            )}
          </Motion>
        </Track>
      </Wrapper>
    );
  }
}

ScrollBar.propTypes = {
  viewportHeight: PropTypes.number,
  contentHeight: PropTypes.number,
  contentPosition: PropTypes.number,
};
