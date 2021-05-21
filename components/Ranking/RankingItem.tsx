import React from 'react'
import { View } from 'react-native'
import {Text} from 'native-base'

import styles from './RankingItem.styles';

const  RankingItem = ({
  number,
  user,
  totalPoints
}) => {

    return (
      <View style={styles.container}>
        <View style={styles.number}>
            <Text style={styles.numberText}> 
            {number > 9 ? number : `0${number}`}{`º`}
          </Text>
        </View>
        <View style={[styles.name, number%2===0 ? styles.nameVariant : null]}>
            <View>
            <Text style={styles.nameText}> {user.first_name}{` `}{user.last_name}</Text>
            </View>
            <View>
            <Text style={styles.namePointsText}>{totalPoints}{` p.`}</Text>
            </View>
        </View>
      </View>
    )

}
  export default RankingItem;
// export default connectStyle("SuperLiga.RankingItem")(RankingItem)