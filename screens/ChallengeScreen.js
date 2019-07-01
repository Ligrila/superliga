import React from 'react';
import {RefreshControl} from 'react-native'
import {connectStyle,Container, Content } from 'native-base'
import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';

import bgSrc from '../assets/images/championship/bg2.png';
import Challenge from '../components/Challenge';
import { ChallengesActions } from '../store/ChallengesStore';



class ChallengeScreen extends React.Component {
  state = {
    refreshing: false
  }
  _onRefresh = ()=>{
    ChallengesActions.list()
  }
  render() {
    const styles = this.props.style;
    return (
      <Container>
        <Wallpaper source={bgSrc}>
        <AppHeader navigation={this.props.navigation} drawerOpen={() => {this.props.navigation.openDrawer()}} />
        <Content contentContainerStyle={styles.content} padder
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh} />
                  }
          >
          <Challenge navigation={this.props.navigation}/>
        </Content>
        </Wallpaper>
      </Container>
    );
  }
}

export default connectStyle('SuperLiga.ChampionshipScreen')(ChallengeScreen);