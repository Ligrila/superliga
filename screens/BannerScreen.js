import React from 'react';
import {View} from 'react-native'
import {Text,connectStyle,Container,Content} from 'native-base'

import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';
import GameMessage from '../components/Game/GameMessage';
import MakeItRain from '../components/MakeItRain';
import AdBanner from '../components/AdBanner';



const bgSrc = require('../assets/images/halfTimePlayBg.png');


class BannerScreen extends React.Component {
  static navigationOptions = {
    title: 'Banner',
  };





  constructor(props) {
    super(props)
  };


  componentDidMount(){
    this.timer = setTimeout( () => {
      this.props.navigation.goBack()
    },  
    6000 // TODO: 7s alex 
    );
  }
 


  
  render() {
    const styles = this.props.style
    const payload = this.props.navigation.getParam('payload',{'bannerType':'admod'})

    return (
      <Container>
        <Content padder={false} contentContainerStyle={styles.container}>
        <AdBanner item={payload}></AdBanner>
        </Content>
      </Container>
    );
  }

}

export default connectStyle('SuperLiga.GameExtraPlayScreen')(BannerScreen);