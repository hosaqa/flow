import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
 
class Drag extends React.Component {
 
  eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };

  handleStop(e) {
    console.log('ye');
  }
 
  render() {
    return (
      <div>
        <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        grid={[25, 25]}
        scale={1}
        onStart={this.handleStart}
        onDrag={this.eventLogger}
        onStop={this.handleStop}>
        <div>
          <div className="handle" style={{
            width: '200px',
            height: '200px',
            background: 'red'
          }}>Drag from here</div>
          <div>This readme is really dragging on...</div>
        </div>
        </Draggable>
      </div>

    );
  }
}
 
export default Drag