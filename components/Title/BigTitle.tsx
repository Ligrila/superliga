import React, { Component } from 'react'
import { View } from 'react-native'

import styles from './BigTitle.styles';

import { Text } from 'native-base'
interface BigTitleProps {
  text: string,
  subtitle?: string,
  red?: string
}

const BigTitle = (props: BigTitleProps) => {

  const { text, subtitle, red } = props;

  return (
    <View style={styles.container}>
      <View style={styles.separator}></View>
      <Text style={styles.title}> {text} { red && <Text style={styles.red}>{red}</Text>}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  )
}

export default BigTitle;