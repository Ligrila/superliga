import React from 'react';
import { Text } from 'native-base';
import { View } from 'react-native';
import TeamAvatar from '../TeamAvatar/TeamAvatar';
import styles from './CalendarItem.styles';
import Moment from 'react-moment';

const CalendarItem = ({ item }) => {
  const avatarW = 120;
  const avatarH = 124;
  const renderTrivia = (trivia) => {
    return (
      <View key={trivia.id} style={styles.triviaContainer}>
        <View style={styles.avatarContainer}>
          <TeamAvatar
            source={trivia.local_team.avatar} width={avatarW} height={avatarH} />
          <Text style={styles.vsText}>vs.</Text>
          <TeamAvatar source={trivia.visit_team.avatar} width={avatarW} height={avatarH} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.teamsText}>
            {trivia.local_team.name}{`\nvs. `}{trivia.visit_team.name}
          </Text>
          <Moment style={styles.dateText} element={Text} format="D [de] MMMM" date={trivia.start_datetime_local} />
          <Moment style={styles.dateText} element={Text} format="HH:mm [hs]" date={trivia.start_datetime_local} />
        </View>
      </View>
    );
  }
  const trivias = item.trivias.map(
    trivia => {
      return renderTrivia(trivia)
    }
  )

  return (
    <View>
      <Text style={styles.title}>{item.name}</Text>
      <View style={styles.allTrivias}>
        {trivias}
      </View>
    </View>
  );

}

export default CalendarItem;