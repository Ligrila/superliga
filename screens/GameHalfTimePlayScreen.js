import React from 'react';
import {connectStyle,Container,Content,Text} from 'native-base'

import {View} from 'react-native'


import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';
import GameMessage from '../components/Game/GameMessage';
import MakeItRain from '../components/MakeItRain';

const bgSrc = require('../assets/images/halfTimePlayBg.png');


class GameHalfTimePlayScreen extends React.Component {
  static navigationOptions = {
    title: 'Jugada de entre tiempo',
  };





  constructor(props) {
    super(props)
  };


  componentDidMount(){
    this.timer = setTimeout( () => {
      this.props.navigation.goBack()
    },  
    6000 
    );
  }
 

  renderMessage = () => {

  }

  renderRain = () => {
    return (<MakeItRain />)
  }
  
  render() {
    const styles = this.props.style


    return (
      <Container>
      <Wallpaper source={bgSrc}>


      <AppHeader navigation={this.props.navigation} drawerOpen={() => {this.props.navigation.openDrawer()}} game={false} />
        <Content padder contentContainerStyle={styles.statistics}>
          <View style={styles.textContainer}>
            <Text style={styles.textLine1}>JUGADA</Text>
            <Text style={styles.textLine2}>DE ENTRE</Text>
            <Text style={styles.textLine3}>TIEMPO</Text>
          </View>
        </Content>
       </Wallpaper>
      </Container>
    );
  }

}

export default connectStyle('SuperLiga.GameHalfTimePlayScreen')(GameHalfTimePlayScreen);