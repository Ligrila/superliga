import React, { Component } from 'react'
import {View,Image} from 'react-native'
import { connectStyle,Text } from 'native-base'

class UserAvatar extends Component {
  render() {
    const styles = this.props.style;
    return (
        <View style={styles.avatarContainer}>
            <Image
            style={styles.avatar}
            source={{uri:this.props.avatar}} />
        </View>
    )
  }
}

export default connectStyle('SuperLiga.UserAvatar')(UserAvatar);