import React, { Component } from 'react'
import { View,ImageBackground } from 'react-native'
import { connectStyle,Text } from 'native-base'


const bg = require('../../assets/images/noticeBg.png');

class Notice extends Component {
  render() {
    const styles = this.props.style;
    return (
    <View style={styles.container}>
        <ImageBackground source={bg} style={styles.background}>
            <Text style={styles.text}> {this.props.text} </Text>
        </ImageBackground>
      </View>
    )
  }
}

export default connectStyle('SuperLiga.Notice')(Notice);