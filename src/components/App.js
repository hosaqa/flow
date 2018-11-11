import React, {Component} from 'react'
import {ThemeProvider} from 'styled-components'

import Player from './Player'
import Scrollable from './Scrollable'

import {lightTheme} from '../theme/globalStyle'

class App extends Component {

  render() {
    return (
      <ThemeProvider theme={lightTheme}>
        <div>
          <div
            style={{
            margin: '50px',
            width: '350px',
            height: '250px',
            background: '#f5f5f5',
            border: '1px solid #333'
          }}>
            <Scrollable>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim culpa beatae non
              delectus cupiditate officiis dolorum eos blanditiis, amet maiores ab consequatur
              architecto ducimus libero alias natus perferendis magnam Lorem ipsum dolor, sit
              amet consectetur adipisicing elit. Quasi ducimus eum repellendus, modi libero
              magnam nobis sequi architecto sapiente consectetur nam ratione sed atque aliquam
              quod tempora porro voluptatibus hic! Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Ipsa qui beatae laboriosam expedita doloribus nemo, repellat,
              totam illo ipsum magni recusandae aperiam corporis mollitia, voluptas
              consectetur omnis? Fugiat, excepturi nobis? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Ipsam mollitia modi ab repellendus magnam fugiat
              expedita nesciunt laborum, quaerat quam ipsa perspiciatis, inventore rerum eius
              nihil harum maiores error possimus.
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus fugit quae veniam at! Voluptatem sed mollitia officiis quasi doloribus, quia impedit nisi incidunt aliquam. Ducimus distinctio quasi sit. Nulla, vel!
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde esse doloribus non. Maxime quidem ipsum illum iste assumenda a aut sed reiciendis amet nemo deserunt vel possimus, accusantium rerum. Nesciunt.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem quam autem delectus perferendis quisquam debitis, unde velit sunt tempore accusantium earum at maiores vel quia impedit tenetur cupiditate voluptatibus corrupti.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero magnam optio et, porro obcaecati nisi similique sequi eaque culpa. Quidem deleniti provident accusantium sapiente dolor amet veniam unde sit cum?
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam sunt nostrum amet quaerat nam eligendi aspernatur incidunt similique deserunt nihil accusantium neque dicta, adipisci molestiae commodi, facilis, officia ipsum aperiam.
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis molestiae, repudiandae, deserunt delectus laborum eos dicta saepe expedita cum unde modi inventore at placeat mollitia facere quia cumque ipsa quo!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni odit culpa eius nemo obcaecati aliquam provident est totam veniam accusamus! Quisquam numquam ullam distinctio. Dolorem architecto impedit voluptatum alias autem.
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam autem sequi natus? Suscipit, magnam tempore voluptatibus eligendi eius repudiandae soluta officiis dolores, debitis minima, nisi molestias corrupti necessitatibus maiores totam.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos, excepturi corporis! Soluta possimus officia eos consequuntur mollitia? Rerum ipsa fugiat repudiandae recusandae nihil impedit eveniet. Quisquam aut et accusamus minus.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis accusamus, earum hic vero pariatur quibusdam quo tempora aut minus porro quam similique autem, harum voluptate eligendi saepe excepturi est error?
              lorem
            </Scrollable>
          </div>
          <Player playlist={this.props.data}/>
        </div>
      </ThemeProvider>
    )
  }
}

export default App
