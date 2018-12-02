import React from 'react';
import Reflux from 'reflux';
import { TouchableOpacity, Image, Share } from 'react-native';
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
const shareSrc = require('../assets/images/share.png');


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
    this.trivia = this.props.navigation.getParam("trivia",false);

  };

  componentDidMount(){
    this.goToHomeTimeout = setTimeout( () => {
      this.props.navigation.navigate('Home')
    },  
    30000
    );
  }

  share = () =>{
    let message = "Hola he terminado una Trivia en Jugada SuperLiga. https://www.jugadasuperliga.com/get"
    Share.share(
      {
        title: 'Jugada Super Liga',
        message: message
      }
    );
  }

  componentWillUnmount(){
    clearTimeout(this.goToHomeTimeout);
    clearTimeout(this.goToStatisticsTimeout);
  }
  renderShare = () => {
    if(!this.state.messageRendered){
      return null;
    }
    const styles = this.props.style;
    return (
      <TouchableOpacity style={styles.shareContainer} onPress={this.share}>
        <Image source={shareSrc} style={styles.shareImg}></Image>
      </TouchableOpacity>
    )
  }
  renderMessage = () => {
    this.goToStatisticsTimeout = setTimeout( () => {
      const messageRendered = true
      this.setState({messageRendered})
      clearTimeout(this.goToStatisticsTimeout);
    }
    , 5000)
    if(this.state.messageRendered){
      return (<GameStatistics trivia_id={this.currentTriviaId} trivia={this.trivia}/>)
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
          {this.renderShare()}
        </Content>
       </Wallpaper>
      </Container>
    );
  }

}

export default connectStyle('SuperLiga.StatisticsScreen')(GameEndScreen);