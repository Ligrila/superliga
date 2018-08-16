import React, { Component } from 'react'
import { View } from 'react-native'

import {connectStyle,Text} from 'native-base'

class Title extends Component {
  render() {
    const styles = this.props.style;
    return (
        <View style={styles.container}>
            <View style={styles.separator}></View>
            <Text style={styles.title}> {this.props.text}</Text>
        </View>
    )
  }
}

export default connectStyle('SuperLiga.Title')(Title)