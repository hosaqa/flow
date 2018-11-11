import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'

import Player from './Player'
import Scrollable from './Scrollable'

import { lightTheme } from '../theme/globalStyle'

class App extends Component {

  render() {
    return (
      <ThemeProvider theme={lightTheme}>
        <div>
          <div style={
          {
          margin: '50px',
          width: '350px',
          height: '250px',
          background: '#f5f5f5',
          border: '1px solid #333'
          }
          }>
            <Scrollable>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim culpa beatae non delectus cupiditate officiis dolorum eos blanditiis, amet maiores ab consequatur architecto ducimus libero alias natus perferendis magnam Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi ducimus eum repellendus, modi libero magnam nobis sequi architecto sapiente consectetur nam ratione sed atque aliquam quod tempora porro voluptatibus hic!
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa qui beatae laboriosam expedita doloribus nemo, repellat, totam illo ipsum magni recusandae aperiam corporis mollitia, voluptas consectetur omnis? Fugiat, excepturi nobis?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam mollitia modi ab repellendus magnam fugiat expedita nesciunt laborum, quaerat quam ipsa perspiciatis, inventore rerum eius nihil harum maiores error possimus.
            </Scrollable>
          </div> 
        {/* <Player playlist={this.props.data} /> */}
        </div>
      </ThemeProvider> 
    )
  }
}

export default App
