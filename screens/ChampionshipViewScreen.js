import React from 'react';

import {connectStyle,Container, Content, Button,Icon } from 'native-base'
import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';

import bgSrc from '../assets/images/championship/bg.png';
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
    this.created = this.props.navigation.getParam('created', false);

  }
  render() {
    const styles = this.props.style;
    return (
      <Container>
        <Wallpaper source={bgSrc}>
        <AppHeader drawerOpen={() => {this.props.navigation.openDrawer()}} />
        <Content contentContainerStyle={styles.content} >
          <ChampionshipView championship={this.championship} created={this.created}/>
        </Content>
        </Wallpaper>
      </Container>
    );
  }
}

export default connectStyle('SuperLiga.ChampionshipScreen')(ChampionshipViewScreen);