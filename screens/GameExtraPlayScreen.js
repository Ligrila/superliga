import React from 'react';
import {connectStyle,Container,Content} from 'native-base'

import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';
import GameMessage from '../components/Game/GameMessage';
import MakeItRain from '../components/MakeItRain';

const bgSrc = require('../assets/images/extraPlayBg.png');


class GameExtraPlayScreen extends React.Component {
  static navigationOptions = {
    title: 'Jugada extra',
  };





  constructor(props) {
    super(props)
  };


  componentDidMount(){
    this.timer = setTimeout( () => {
      this.props.navigation.goBack()
    },  
    6000 
    );
  }
 

  renderMessage = () => {

  }

  renderRain = () => {
    return (<MakeItRain />)
  }
  
  render() {
    const styles = this.props.style

    return (
      <Container>
      <Wallpaper source={bgSrc}>


      <AppHeader drawerOpen={() => {this.props.navigation.openDrawer()}} game={false} />
        <Content padder contentContainerStyle={styles.statistics}>
          {this.renderMessage()}
        </Content>
       </Wallpaper>
      </Container>
    );
  }

}

export default connectStyle('SuperLiga.StatisticsScreen')(GameExtraPlayScreen);