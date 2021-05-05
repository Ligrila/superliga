import React from 'react';

import { View } from 'react-native';
import { DatesStore, DatesActions } from '../../store/DatesStore';
import CalendarItem from './CalendarItem';
import Title from '../Title';
import styles from './Calendar.styles';
import { ScrollView } from 'react-native-gesture-handler';
import { Content } from 'native-base';
import BigTitle from '../Title/BigTitle';
const Calendar = ({ calendar }) => {
  // console.log('calendar', calendar.length)
  return (
    <View style={styles.container}>
      <BigTitle text={`FIXTURE\nSUPERLIGA`} />
       <Content padder> 
        {calendar && calendar.length > 0 &&
          calendar.map(item => (
            <CalendarItem key={item.id} item={item} />
          ))}
      </Content>
    </View>
  );

}


export default Calendar;