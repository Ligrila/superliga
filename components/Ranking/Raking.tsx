import React, { useCallback, useEffect, useState } from 'react'
// React Native
import { View, RefreshControl } from 'react-native'
// Native Base
import {
  Text,
  Form,
  Content
} from 'native-base'
// Components
import RankingItem from './RankingItem';
import PickerDefault, { PickerDefaultItemProps } from '../Picker/PickerDefault';
// Styles
import styles from './Ranking.styles';
// Recoil
import { useRecoilCallback, useRecoilState, useRecoilValueLoadable } from 'recoil';
import { datesAtom, datesSelector } from '../../recoil/Dates.recoil';
import { rankingSelector } from '../../recoil/Ranking.recoil';
import Logo from '../Logo/Logo';
import { ScrollView } from 'react-native-gesture-handler';


const Ranking = () => {
  // States
  const [dateSelected, setDateSelected] = useState('general');
  // Items
  const [items, setItems] = useState<Array<PickerDefaultItemProps>>(new Array<PickerDefaultItemProps>());
  // Recoil
  const [dates, setDates] = useRecoilState(datesAtom);
  const ranking = useRecoilValueLoadable(rankingSelector(dateSelected))
  // Refreshing
  const [refreshing, setRefreshing] = useState(false)
  // Update Calendar
  const updateDates = useRecoilCallback(({ snapshot }) => async () => {
    setRefreshing(true);
    const response = await snapshot.getPromise(datesSelector);
    setDates(response.data);
    setRefreshing(false);

  }, [setDates, setRefreshing]);
  // Picker Change
  const onValueChange = function (value) {
    setDateSelected(value);
  }
  // Refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await updateDates();
    setRefreshing(false)

  }

  const renderTopTen = (data) => {
    let items: any = null;
    let number = 0;
    if (data.users.length > 0) {
      items = data.users.map(
        item => {
          number++
          return (
            <RankingItem key={item.user_id}
              user={item.user}
              totalPoints={item.total_points}
              number={number} />
          )
        }
      )
    } else {
      items = (
        <View style={styles.rankingEmpty}>
          <Text style={styles.rankingEmptyText}>{`Sin datos`}</Text>
        </View>
      )
    }
    return items
  }

  // Fetch Items
  const fetchItems = useCallback(() => {
    const newItems = new Array<PickerDefaultItemProps>()
    newItems.push({
      id: 'general',
      label: 'Ranking General',
      value: 'general',
    })
    newItems.push({
      id: 'week',
      label: 'Ranking Semanal',
      value: 'week',
    })
    if (dates && dates.length > 0) {
      for (const date of dates) {
        newItems.push({
          id: date.id,
          label: date.name,
          value: date.id,
        })
      }
    }
    console.log(newItems)
    setItems([...newItems])
  }, [setItems, dates])
  useEffect(() => {
    if (dates) {
      fetchItems();
    }
  }, [dates, fetchItems])
  // Fetch Inital Data
  const fetchInitialData = useCallback(async () => {
    await updateDates();
  }, [updateDates])
  useEffect(() => {
    fetchInitialData();
  }, [])
  return (

    <Content
      contentContainerStyle={{ flex: 1 }}
      refreshControl={
        <RefreshControl
          style={{ backgroundColor: '#transparent' }}
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#fff" // Ios
          colors={['#282828', '#fff']} //android
          title={''}
          progressBackgroundColor="#fff"
        />
      }>      
      {dates &&
        <Form style={styles.pickerContainer}>
          <PickerDefault
            headerTitle="Seleccionar fecha"
            placeholderText="Seleccionar fecha..."
            value={dateSelected}
            onChangeValue={onValueChange}
            items={items}
          />
        </Form>
      }
      <View style={styles.titleContainer}>
        <Text style={styles.light}>{`Ranking`}</Text>
        <Text style={styles.bold}>{` TOP 10`}</Text>
      </View>
      <ScrollView>
        {ranking.state === 'hasValue' && renderTopTen(ranking.contents.data)}
      </ScrollView>
    </Content>

  )

}


export default Ranking;
