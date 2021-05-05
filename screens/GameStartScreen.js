import React from 'react';
import {connectStyle,Container,Content} from 'native-base'

import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';
import GameMessage from '../components/Game/GameMessage';
import MakeItRain from '../components/MakeItRain';
import { StyleSheet } from 'react-native';

const bgSrc = require('../assets/images/bg.png');
const bgProgrammedTriviaSrc = require('../assets/images/programmed-trivia-bg.png');
import Layout from '../constants/Layout';



const styles = StyleSheet.create(

  {
    statistics:{
      flex: 1,
    },
    container:{
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowContainer:{
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    statisticsItem:{
    },
    shareContainer:{
        position: 'absolute',
        bottom:0,
        right:0
    },
    shareImg:{
        width: Layout.s(159),
        height: Layout.s(149)
    },
}
);

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
    const {trivia} = this.props.route.params;
    if(trivia && trivia.type=='trivia'){
      return (
        <GameMessage title="Arranca la" bigText='trivia!' award={trivia.award} whistle2={true}></GameMessage>
      )
    }
    return (
      <GameMessage title="Comienza el" bigText='partido!'></GameMessage>
    )
  }

  renderRain = () => {
    return (<MakeItRain />)
  }
  
  render() {

    const rain =  <MakeItRain />

    let currentBg = bgSrc;
    const {trivia} = this.props.route.params;
    if(trivia && trivia.type=='trivia'){
      currentBg = bgProgrammedTriviaSrc;
    }
    

    return (
      <Container>
      <Wallpaper source={currentBg}>


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

//export default connectStyle('SuperLiga.StatisticsScreen')(GameStartScreen);
export default GameStartScreen;