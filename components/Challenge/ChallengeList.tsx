import React from 'react';
import { Content, List } from 'native-base'
import Title from '../Title/Title';
import Notice from '../Notice/Notice';
import ChallengeItem from './ChallengeItem';

import styles from './ChallengeList.styles'
import { useRecoilValue } from 'recoil';
import { challengesAtom } from '../../recoil/Challenge.recoil';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'react-native';

const ChallengeList = () => {

  const challenges = useRecoilValue(challengesAtom);


  const renderItems = () => {
    console.log('challenges', challenges)
    if (!challenges.hasData || (challenges.hasData && challenges.data.length === 0)) {
      return (
        <Notice text="Todavía no has desafiado a un torneo." />
      )
    }

    return challenges.data.map((challenge) => {
      return (
        <ChallengeItem
          key={challenge.id}
          challenge={challenge} />
      )
    })
  }


  return (
    <View style={styles.container}>
      <Title text={'TUS \n DESAFIOS'} hideSeparator={true} />
      <ScrollView>
        <List style={styles.list}>
          {renderItems()}
        </List>
      </ScrollView>
    </View>
  );

}


export default ChallengeList;