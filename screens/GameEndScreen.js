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

  state = {
    messageRendered: false
  }

  constructor(props) {
    super(props)
    this.store = CurrentTriviaStatisticsStore;
  };

  componentDidMount(){
    CurrentTriviaStatisticsActions.update();
  }

  renderMessage = () => {
    setTimeout( () => {
      const messageRendered = true
      this.setState({messageRendered})
    }
    , 5000)
    if(this.state.messageRendered){
      return (<GameStatistics />)
    }
    return (
      <GameMessage title="Termino el partido"></GameMessage>
    )
  }
  
  render() {
    const styles = this.props.style

    const rain =  <MakeItRain />

    return (
      <Container>
      <Wallpaper source={bgSrc}>

      <MakeItRain />

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