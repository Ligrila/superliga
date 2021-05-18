import React, { Component } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { Text } from 'native-base'

import TeamAvatar from '../TeamAvatar';
import Notice from '../Notice/Notice';
import Layout from '../../constants/Layout';


import styles from './Trivia.styles'


interface TriviaProps {
  trivia: any,
  avatarWidth?: number,
  avatarHeight?: number,
}

const Trivia = ({ trivia, avatarWidth, avatarHeight }: TriviaProps) => {


  const getNotice = () => {
    if (trivia.points_multiplier > 1) {
      if (trivia.points_multiplier == 2) {
        return <Notice text={'x cada acierto \n tus puntos se duplican!'} />
      } else {
        return <Notice text={'x cada acierto \n tus puntos valen ' + trivia.points_multiplier + ' veces más!'} />
      }
    }

    return null;
  }

  const renderTrivia = () => {
    if (trivia.type === 'trivia') {
      const title1 = trivia.title1 ? trivia.title1.toUpperCase() : 'TRIVIA';
      const title2 = trivia.title2 ? trivia.title2.toUpperCase() : 'SEMANAL';
      return (
        <View style={styles.avatarContainer}>
          <View style={styles.programmedTriviaTextContainer}>
            <Text style={styles.programmedTriviaText1}>{title1}</Text>
            <Text style={styles.programmedTriviaText2}>{title2}</Text>
          </View>
        </View>
      )
    }
    return (
      <View style={styles.avatarContainer}>
        <TeamAvatar source={trivia.local_team.avatar} width={width} height={height} />
        <Text style={styles.vsText}>vs</Text>
        <TeamAvatar source={trivia.visit_team.avatar} width={width} height={height} />
      </View>
    )
  }

  const width = avatarWidth || 212 * Layout.window.ratio;
  const height = avatarHeight || 238 * Layout.window.ratio;

  return (
    <View>
      {renderTrivia()}
      <View>
        {getNotice()}
      </View>

    </View>


  );

}

export default Trivia;
