import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { connectStyle,Container, Content, Footer,Spinner } from 'native-base'

import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';

import bgSrc from '../assets/images/bg.png';
import gameBgSrc from '../assets/images/game/bg.png';
import Api from '../api/Api';

import Game from '../components/Game';
import GameConnectedUsers from '../components/Game/GameConnectedUsers';

import Reflux from 'reflux';
import { TriviaQuestion } from '../store/TriviaQuestion';


class GameScreen extends Reflux.Component {
  api = new Api;
  constructor(props){
    super(props);
    this.state = {
      isLoadingComplete: false
    }
    this.store = TriviaQuestion
  }
  async componentDidMount() {
    const currentTrivia = await this.api.getCurrentTrivia();
    if(currentTrivia.success){
      this.setState({isLoadingComplete:true,currentTrivia: currentTrivia});
    } else{
      // que hacemos ? // vamos a home ? mostramos no hay trivia todavia ? mostramos la siguiente ?
    }
  }
  renderGame(){
    if(this.state.isLoadingComplete){
      return (
        <Game currentTrivia={this.state.currentTrivia} navigation={this.props.navigation}>
        </Game>
      );
    } else{
      return(<Spinner />);
    }
  }
  render() {
    const styles = this.props.style;
    return (
      <Container>
        <Wallpaper source={this.state.hasQuestion ? gameBgSrc : bgSrc}>
        <AppHeader drawerOpen={() => {this.props.navigation.openDrawer()}} game={true} />
        <Content padder contentContainerStyle={styles.game}>
          {this.renderGame()}
        </Content>
        <Footer>
          <GameConnectedUsers />
        </Footer>
        </Wallpaper>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  game:{
    flex:1,
  }
});


export default connectStyle('SuperLiga.Screen')(GameScreen);