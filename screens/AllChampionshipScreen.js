import React from 'react';
import {RefreshControl} from 'react-native'
import {connectStyle,Container, Content } from 'native-base'
import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';

import bgSrc from '../assets/images/championship/bg2.png';
import AllChampionship from '../components/Championship/AllChampionship';
import { AllChampionshipsActions } from '../store/AllChampionshipsStore';



class AllChampionshipScreen extends React.Component {
  state = {
    refreshing: false
  }
  _onRefresh = ()=>{
    AllChampionshipsActions.list()
  }
  render() {
    const styles = this.props.style;
    return (
      <Container
      >
        <Wallpaper source={bgSrc}>
        <AppHeader drawerOpen={() => {this.props.navigation.openDrawer()}} />
        <Content contentContainerStyle={styles.content}
                        refreshControl={
                          <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh} />
                          }        
          >
          <AllChampionship navigation={this.props.navigation}/>
        </Content>
        </Wallpaper>
      </Container>
    );
  }
}

export default connectStyle('SuperLiga.ChampionshipScreen')(AllChampionshipScreen);