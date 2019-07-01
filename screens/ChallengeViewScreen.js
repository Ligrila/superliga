import React from 'react';

import {connectStyle,Container, Content, Button,Icon } from 'native-base'
import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';

import bgSrc from '../assets/images/championship/bg2.png';
import ChallengeView from '../components/Challenge/ChallengeView';





class ChallengeViewScreen extends React.Component {
  challenge = {
    id: null,
    name: null,
    challenge1:{},
    challenge2:{}
  }
  constructor(props){
    super(props);
    this.challenge = this.props.navigation.getParam('challenge', this.challenge);
    this.notified = this.props.navigation.getParam('notified', false);

  }
  render() {
    const styles = this.props.style;
    const returnButton = (<Button transparent onPress={()=>{
      this.props.navigation.navigate("ChallengeHome")
    }}><Icon name='ios-arrow-back' /></Button>)
    return (
      <Container>
        <Wallpaper source={bgSrc}>
        <AppHeader navigation={this.props.navigation} drawerOpen={() => {this.props.navigation.openDrawer()}} return={returnButton} />
        <Content contentContainerStyle={styles.content} >
          <ChallengeView challenge={this.challenge} notified={this.notified}/>
        </Content>
        </Wallpaper>
      </Container>
    );
  }
}

export default connectStyle('SuperLiga.challengeScreen')(ChallengeViewScreen);