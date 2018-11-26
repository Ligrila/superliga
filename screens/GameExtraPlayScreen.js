import React from 'react';
import {View} from 'react-native'
import {Text,connectStyle,Container,Content} from 'native-base'

import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';
import GameMessage from '../components/Game/GameMessage';
import MakeItRain from '../components/MakeItRain';

const bgSrc = require('../assets/images/halfTimePlayBg.png');


class GameExtraPlayScreen extends React.Component {
  static navigationOptions = {
    title: 'Jugada extra',
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


      <AppHeader drawerOpen={() => {this.props.navigation.openDrawer()}} game={false} />
        <Content padder contentContainerStyle={styles.statistics}>
        <View style={styles.textContainer}>
            <Text style={styles.textLine1}>JUGADA</Text>
            <Text style={styles.textLine2}>EXTRA</Text>
            <Text style={styles.textLine3}>BONUS TRACK</Text>
          </View>
        </Content>
       </Wallpaper>
      </Container>
    );
  }

}

export default connectStyle('SuperLiga.GameExtraPlayScreen')(GameExtraPlayScreen);