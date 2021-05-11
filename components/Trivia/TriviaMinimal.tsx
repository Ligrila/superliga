import React from 'react'
import { View } from 'react-native'
import {  Text } from 'native-base'

import TeamAvatar from '../TeamAvatar';
import Layout from '../../constants/Layout';

import styles from './TriviaMinimal.styles';

interface TriviaMinimalProps{
  trivia: any,
  avatarWidth?: number,
  avatarHeight?: number,
}

const TriviaMinimal = ({ trivia, avatarWidth, avatarHeight }:TriviaMinimalProps) => {

    

    let sdate = trivia.start_datetime_local.toDate();
    let until = (sdate.getTime() - new Date().getTime()) / 1000;
    const width = avatarWidth || 212 * Layout.window.ratio;
    const height = avatarHeight || 238 * Layout.window.ratio;
    const title1 = trivia.title1 ? trivia.title1.toUpperCase() : 'TRIVIA';
    const title2 = trivia.title2 ? trivia.title2.toUpperCase() : 'SEMANAL';
    if (trivia.type == 'trivia') {
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
      <View>
        <View style={styles.avatarContainer}>
          <TeamAvatar source={trivia.local_team.avatar} width={width} height={height} />
          <Text style={styles.vsText}>VS.</Text>
          <TeamAvatar source={trivia.visit_team.avatar} width={width} height={height} />
        </View>
      </View>
    );
  
}

export default TriviaMinimal;