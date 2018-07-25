import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { connectStyle,Container, Content, Text, Button,Spinner } from 'native-base'

import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';

import bgSrc from '../assets/images/bg.png';
import Api from '../api/Api';

import Game from '../components/Game';

class GameScreen extends React.Component {
  api = new Api;
  constructor(props){
    super(props);
    this.state = {
      isLoadingComplete: false
    }
  }
  async componentDidMount() {
    const currentTrivia = await this.api.getCurrentTrivia();
    console.log(currentTrivia);
    if(currentTrivia.success){
      this.setState({isLoadingComplete:true,currentTrivia: currentTrivia});
    } else{
      // que hacemos ? // vamos a home ? mostramos no hay trivia todavia ? mostramos la siguiente ?
    }
  }
  renderGame(){
    const styles = this.props.style;
    if(this.state.isLoadingComplete){
      return (
        <Game currentTrivia={this.state.currentTrivia} style={styles.game} >
        </Game>
      );
    } else{
      return(<Spinner />);
    }
  }
  render() {
    return (
      <Container>
        <Wallpaper source={bgSrc}>
        <AppHeader drawerOpen={() => {this.props.navigation.openDrawer()}} game={true} />
        <Content padder>
          {this.renderGame()}
        </Content>
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