import React, { Component } from 'react'
import {View,Image} from 'react-native'
import { connectStyle,Text } from 'native-base'

class Avatar extends Component {

  render() {
    const styles = this.props.style;
    if(this.props.mini){
      return (
        <View style={styles.container}>
          <View style={styles.avatarMiniContainer}>
              <Image
              style={styles.avatarMini}
              source={this.props.avatar} />
          </View>
          </View>
      )
    }
    if(this.props.medium){
      let avatarMediumContainer = styles.avatarMediumContainer
      if(this.props.alternateBorder){
        avatarMediumContainer = {...avatarMediumContainer,...styles.alternateBorder}
      }
      return (
        <View style={styles.container}>
          <View style={avatarMediumContainer}>
              <Image
              style={styles.avatarMedium}
              source={this.props.avatar} />
          </View>
          </View>
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
            <Image
            style={styles.avatar}
            source={this.props.avatar} />
        </View>
        </View>
    )
  }
}

export default connectStyle('SuperLiga.Avatar')(Avatar);