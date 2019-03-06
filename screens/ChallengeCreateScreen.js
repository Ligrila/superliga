import React from 'react';

import {connectStyle,Container, Content, Button, Icon } from 'native-base'
import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';

import bgSrc from '../assets/images/championship/bg.png';
import CreateChallenge from '../components/Challenge/CreateChallenge';



class ChallengeCreateScreen extends React.Component {
  championship = {
    id: null,
    name: null,
    start_date: null,
    end_date: null,
    user: {
      first_name: null,
      last_name: null
    }
  }
  constructor(props){
    super(props)
    this.championship = this.props.navigation.getParam('championship', this.championship);
  }
  render() {
    const returnButton = (<Button transparent onPress={()=>{
      this.props.navigation.navigate("ChallengeHome")
    }}><Icon name='ios-arrow-back' /></Button>)
    const styles = this.props.style;
    return (
      <Container>
        <Wallpaper source={bgSrc}>
        <AppHeader drawerOpen={() => {this.props.navigation.openDrawer()}} return={returnButton} />
        <Content contentContainerStyle={styles.game} >
          <CreateChallenge championship={this.championship} navigation={this.props.navigation}></CreateChallenge>
        </Content>
        </Wallpaper>
      </Container>
    );
  }
}

export default connectStyle('SuperLiga.ChallengeScreen')(ChallengeCreateScreen);