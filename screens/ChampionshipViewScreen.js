import React from 'react';

import {connectStyle,Container, Content } from 'native-base'
import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';

import bgSrc from '../assets/images/championship/bg.png';
import Championship from '../components/Championship';
import ChampionshipView from '../components/Championship/ChampionshipView';



class ChampionshipViewScreen extends React.Component {
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
    super(props);
    this.championship = this.props.navigation.getParam('championship', this.championship);

  }
  render() {
    const styles = this.props.style;
    return (
      <Container>
        <Wallpaper source={bgSrc}>
        <AppHeader drawerOpen={() => {this.props.navigation.openDrawer()}} />
        <Content contentContainerStyle={styles.game} >
          <ChampionshipView championship={this.championship} />
        </Content>
        </Wallpaper>
      </Container>
    );
  }
}

export default connectStyle('SuperLiga.ChampionshipScreen')(ChampionshipViewScreen);