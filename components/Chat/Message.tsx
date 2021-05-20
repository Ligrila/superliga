import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Text } from 'native-base'


import styles from './Message.styles';

const Message = (props) => {

  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{ uri: props.message.avatar }} />
      <Text style={styles.text}> {props.message.name}:  {props.message.message} </Text>
    </View>
  )

}
export default Message;
// export default connectStyle('SuperLiga.ChatMessage')(Message)