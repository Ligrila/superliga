import React from 'react';
import {connectStyle,Container,Content} from 'native-base'

import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';
import GameMessage from '../components/Game/GameMessage';
import MakeItRain from '../components/MakeItRain';

const bgSrc = require('../assets/images/bg.png');


class GameHalfTimeStartScreen extends React.Component {
  static navigationOptions = {
    title: 'Arranca el segundo tiempo',
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
    return (
      <GameMessage title="Arranca el segundo" bigText='tiempo!'></GameMessage>
      )
  }

  renderRain = () => {
    return (<MakeItRain />)
  }
  
  render() {
    const styles = this.props.style

    const rain =  <MakeItRain />

    return (
      <Container>
      <Wallpaper source={bgSrc}>


      {this.renderRain()}
      <AppHeader navigation={this.props.navigation} drawerOpen={() => {this.props.navigation.openDrawer()}} game={false} />
        <Content padder contentContainerStyle={styles.statistics}>
          {this.renderMessage()}
        </Content>
       </Wallpaper>
      </Container>
    );
  }

}

export default connectStyle('SuperLiga.StatisticsScreen')(GameHalfTimeStartScreen);