import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'

import Header from './Header'
import Player from './Player'
import styled from 'styled-components'

import { lightTheme } from '../theme/globalStyle'

import Scrollable from './Scrollable'
import 'react-perfect-scrollbar/dist/css/styles.css';

import PerfectScrollbar from 'react-perfect-scrollbar'

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
        ... SCROLLBAR CONTENT HERE ...
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores quos blanditiis veniam, dolor facilis sed ullam totam. Velit, accusamus illo! Maiores sequi ratione facere. Mollitia aspernatur itaque ab maiores non?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, cumque in eum voluptate fugit mollitia dolores repellat veniam! Harum tempora mollitia dignissimos veritatis asperiores officiis provident ipsam unde minus ullam.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas mollitia hic reiciendis dignissimos voluptate pariatur nihil delectus ducimus cumque at quo assumenda blanditiis, laboriosam aliquam magnam eum tempora provident ex!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae sit dicta eius minima blanditiis, harum commodi? Molestiae incidunt maiores itaque voluptatem odio assumenda numquam facilis cum unde ipsum, autem ducimus.
    </Scrollable>
          </div>
        
        <Player playlist={this.props.data} />
        </div>

      </ThemeProvider> 
    )
  }
}

export default App
