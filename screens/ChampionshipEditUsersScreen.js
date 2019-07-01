import React from 'react';

import {connectStyle,Container, Content, Button, Icon } from 'native-base'
import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';

import bgSrc from '../assets/images/championship/bg.png';
import EditChampionshipUsers from '../components/Championship/EditChampionshipUsers';




class ChampionshipEditUsersScreen extends React.Component {
  render() {
    const returnButton = (<Button transparent onPress={()=>{
      this.props.navigation.navigate("ChampionshipHome")
    }}><Icon name='ios-arrow-back' /></Button>)
    const styles = this.props.style;
    return (
      <Container>
        <Wallpaper source={bgSrc}>
        <AppHeader navigation={this.props.navigation} drawerOpen={() => {this.props.navigation.openDrawer()}} return={returnButton} />
        <Content contentContainerStyle={styles.game} padder>
          <EditChampionshipUsers championship={this.props.navigation.getParam('championship',{})} navigation={this.props.navigation} />
        </Content>
        </Wallpaper>
      </Container>
    );
  }
}

export default connectStyle('SuperLiga.ChampionshipScreen')(ChampionshipEditUsersScreen);