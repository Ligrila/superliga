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
  timeout = null;
  constructor(props){
    super(props);
  }
  async componentDidMount() {
    const { navigation } = this.props;
    const lives = navigation.getParam('lives', null);
    const win = navigation.getParam('win', false);
    const hasLife = win||lives>1;
    const changeNavigationTimeout = 6000;
    if(hasLife){
      this.timeout = setTimeout(()=>{
        navigation.goBack();
      },changeNavigationTimeout)
    }
  }
  componentWillUnmount(){
    if(this.timeout){
      clearTimeout(this.timeout);
    }
  }
  renderResult(){
    const { navigation } = this.props;
    const win = navigation.getParam('win', false);
    const points = navigation.getParam('points', null);
    const lives = navigation.getParam('lives', null);
    const canceled = navigation.getParam('canceled', false);

    const serverSuccess = navigation.getParam('serverSuccess', false);
    
    return (<GameAnswerResult win={win} canceled={canceled} points={points} lives={lives} serverSuccess={serverSuccess} navigation={this.props.navigation}/>);    
  
  }

  render() {
    const styles = this.props.style;
    const { navigation } = this.props;
    const win = navigation.getParam('win', false);
    const lives = navigation.getParam('lives', null);
    const rain = win ? <MakeItRain /> : null;
    const renderBg = (win||lives>1) ? bgSrc : wrongBgSrc;
    return (
      <Container>
        <Wallpaper source={renderBg}>
        {rain}
        <AppHeader navigation={this.props.navigation} drawerOpen={() => {this.props.navigation.openDrawer()}} game={true} />
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