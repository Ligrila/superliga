import React from 'react';
//import { View,TouchableOpacity } from 'react-native'

import {connectStyle,Container,Content} from 'native-base';


import Wallpaper from '../components/Wallpaper';

import gameDisabledBgSrc from '../assets/images/result/wrong_bg.png';
import Purchase from '../components/Purchase';
import AppHeader from '../components/AppHeader/AppHeader';

class LivePacksScreen extends React.Component {

  constructor(props){
    super(props);
  }

  onHide = () =>{
    this.props.navigation.navigate('HomeSwitcher');
  }
  render() {
    const styles = this.props.style;
    return (
      <Container>
      <Wallpaper source={gameDisabledBgSrc}>
      <AppHeader navigation={this.props.navigation} drawerOpen={() => {this.props.navigation.openDrawer()}} game={false} style={styles.header} />
        <Content contentContainerStyle={styles.container}>
          <Purchase 
            onHidePress={this.onHide}
            navigation={this.props.navigation}>
          </Purchase>
        </Content>
        </Wallpaper>
      </Container>
    );
  }


}

export default connectStyle('SuperLiga.LivePacksScreen')(LivePacksScreen);