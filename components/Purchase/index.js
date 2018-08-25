import React, { Component } from 'react'
import { View, ImageBackground } from 'react-native'

import {connectStyle,Text} from 'native-base'

import bgSrc from '../../assets/images/purchase-modal.png'

class Purchase extends Component {
  render() {
    const styles = this.props.style;
    return (
      <View style={styles.container}>
        <ImageBackground source={bgSrc} style={styles.background}>
            <Text>Inside</Text>
        </ImageBackground>

      </View>
    )
  }
}

export default connectStyle('SuperLiga.Purchase')(Purchase);