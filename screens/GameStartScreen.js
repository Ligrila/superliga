import React from 'react';
import {connectStyle,Container,Content} from 'native-base'

import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';
import GameMessage from '../components/Game/GameMessage';
import MakeItRain from '../components/MakeItRain';

const bgSrc = require('../assets/images/bg.png');


class GameStartScreen extends React.Component {
  static navigationOptions = {
    title: 'Fin del primer tiempo',
  };


 timer = null;


  constructor(props) {
    super(props)
  };

  

  componentDidMount(){
    this.timer = setTimeout( () => {
      this.props.navigation.navigate("GamePlay")
    },  
    6000 
    );
  }

  componentWillUnmount(){
    clearTimeout(this.timer);
  }

 

  renderMessage = () => {
    return (
      <GameMessage title="Comienza el" bigText='partido!'></GameMessage>
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
      <AppHeader drawerOpen={() => {this.props.navigation.openDrawer()}} game={false} />
        <Content padder contentContainerStyle={styles.statistics}>
          {this.renderMessage()}
        </Content>
       </Wallpaper>
      </Container>
    );
  }

}

export default connectStyle('SuperLiga.StatisticsScreen')(GameStartScreen);