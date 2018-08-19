import React, { Component } from 'react'
import { View } from 'react-native'

import {connectStyle,Text} from 'native-base'

class BigTitle extends Component {
  render() {
    const styles = this.props.style;
    return (
        <View style={styles.container}>
            <View style={styles.separator}></View>
            <Text style={styles.title}> {this.props.text} <Text style={styles.red}>{this.props.red}</Text></Text>
            <Text style={styles.subtitle}>{this.props.subtitle}</Text>
        </View>
    )
  }
}

export default connectStyle('SuperLiga.BigTitle')(BigTitle)