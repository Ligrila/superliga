import React, { Component } from 'react'
import { View } from 'react-native'

import styles from './BigTitle.styles';

import { Text } from 'native-base'
interface BigTitleProps {
  text: string,
  subtitle?: string,
  red?: string,
  hideSeparator?: boolean,
  titleBold?: boolean
}

const BigTitle = (props: BigTitleProps) => {

  const { text, subtitle, red, titleBold} = props;

  return (
    <View style={styles.container}>
      {props.hideSeparator ? null : <View style={styles.separator}></View>}
      <Text style={[styles.title, titleBold ? styles.bigTitleBold : null ]}> {text} { red && <Text style={styles.red}>{red}</Text>}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  )
}

export default BigTitle;