import React from 'react';
import { StyleSheet } from 'react-native';
import { connectStyle,Container, Content, Footer,Spinner } from 'native-base'

import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';

import bgSrc from '../assets/images/bg.png';
import wrongBgSrc from '../assets/images/result/wrong_bg.png';

import GameConnectedUsers from '../components/Game/GameConnectedUsers';
import GameAnswerResult from '../components/Game/GameAnswerResult';
import MakeItRain from '../components/MakeItRain';





class GameResultScreen extends React.Component {
  constructor(props){
    super(props);
  }
  async componentDidMount() {
    const { navigation } = this.props;
    const hasLife = navigation.getParam('hasLives', true); // TODO:
    const changeNavigationTimeout = 6000;
    if(hasLife){
      setTimeout(()=>{
        navigation.navigate('HomeSwitcher');
      },changeNavigationTimeout)
    }
  }
  renderResult(){
    const { navigation } = this.props;
    const win = navigation.getParam('win', false);
    const serverSuccess = navigation.getParam('serverSuccess', false);
    
    return (<GameAnswerResult win={win} serverSuccess={serverSuccess} navigation={this.props.navigation} />);    
  
  }

  render() {
    const styles = this.props.style;
    const { navigation } = this.props;
    const win = navigation.getParam('win', false);
    const rain = win ? <MakeItRain /> : null;
    return (
      <Container>
        <Wallpaper source={win ? bgSrc : wrongBgSrc}>
        {rain}
        <AppHeader drawerOpen={() => {this.props.navigation.openDrawer()}} game={true} />
        <Content padder contentContainerStyle={styles.game}>
          {this.renderResult()}
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


export default connectStyle('SuperLiga.Screen')(GameResultScreen);