import React from 'react';
import Reflux from 'reflux';
import { View } from 'react-native';
import {connectStyle,Container,Content} from 'native-base'

import Wallpaper from '../components/Wallpaper';
import StatisticItem from '../components/StatisticItem';
import AppHeader from '../components/AppHeader/AppHeader';
import { CurrentTriviaStatisticsStore, CurrentTriviaStatisticsActions } from '../store/CurrentTriviaStatisticsStore';
import BigTitle from '../components/Title/BigTitle';
import GameMessage from '../components/Game/GameMessage';
import GameStatistics from '../components/Game/GameStatistics';
import MakeItRain from '../components/MakeItRain';

const bgSrc = require('../assets/images/bg.png');

class GameEndScreen extends React.Component {
  static navigationOptions = {
    title: 'Fin del partido',
  };

  goToHomeTimeout = null;
  goToStatisticsTimeout = null;
  currentTriviaId = false;

  state = {
    messageRendered: false
  }

  constructor(props) {
    super(props)
    this.currentTriviaId = this.props.navigation.getParam("currentTriviaId",false);
  };

  componentDidMount(){
    this.goToHomeTimeout = setTimeout( () => {
      this.props.navigation.navigate('Home')
    },  
    20000 
    );
  }

  componentWillUnmount(){
    clearTimeout(this.goToHomeTimeout);
    clearTimeout(this.goToStatisticsTimeout);
  }

  renderMessage = () => {
    this.goToStatisticsTimeout = setTimeout( () => {
      const messageRendered = true
      this.setState({messageRendered})
      clearTimeout(this.goToStatisticsTimeout);
    }
    , 5000)
    if(this.state.messageRendered){
      return (<GameStatistics trivia_id={this.currentTriviaId}/>)
    }

    return (
      <GameMessage title="Termino el" bigText="partido!"></GameMessage>
    )
  }

  renderRain = () => {
    if(this.state.messageRendered){
      return null;
    }
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

export default connectStyle('SuperLiga.StatisticsScreen')(GameEndScreen);