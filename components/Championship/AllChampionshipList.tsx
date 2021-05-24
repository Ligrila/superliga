import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { Form, Content, View, Text } from "native-base";
import Notice from "../Notice/Notice";
import ChampionshipItem from "./ChampionshipItem";
import PickerDefault, { PickerDefaultItemProps } from "../Picker/PickerDefault";
import { ScrollView } from "react-native-gesture-handler";
// Recoil
import { useRecoilCallback, useRecoilState, useRecoilValueLoadable } from "recoil";
import { allChampionshipRankingSelector } from "../../recoil/AllChmapionship.recoil";
import { championshipDatesAtom, championshipDatesSelector } from "../../recoil/ChampionshipDates.recoil";
// Styles
import styles from './AllChampionshipList.styles';
const AllChampionshipList = () => {
  const [dateSelected, setDateSelected] = useState('general');
  const [refreshing, setRefreshing] = useState(false);
  const ranking = useRecoilValueLoadable(allChampionshipRankingSelector(dateSelected))
  // Dates
  const [dates, setDates] = useRecoilState(championshipDatesAtom);
  // Item
  const [items, setItems] = useState<Array<PickerDefaultItemProps>>(new Array<PickerDefaultItemProps>());
  // Update Calendar
  const updateDates = useRecoilCallback(({ snapshot }) => async () => {
    setRefreshing(true);
    const response = await snapshot.getPromise(championshipDatesSelector);
    setDates(response.data);
    setRefreshing(false);

  }, [setDates, setRefreshing]);
  const onRefresh = async () => {
    await updateDates();
  }
  
  // Fetch Items
  const fetchItems = useCallback(() => {
    const newItems = new Array<PickerDefaultItemProps>()
    newItems.push({
      id: 'general',
      label: 'Ranking General',
      value: 'general',
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

  const onValueChange = (value) => {
    setDateSelected(value);
  }

  const renderItems = (data) => {
    if (data.length == 0) {
      return <Notice text="No hemos encontrado ningun torneo" />;
    }

    let position = 0;

    return data.map((ranking, index) => {
      
      
      const championship = {
        ...ranking.championship,
        position: ++position,
        points: ranking.points,
      };

      const altrow = index % 2 === 0;
      return (
        <ChampionshipItem
          key={championship.id}
          altrow={altrow}
          championship={championship}
        />
      );
    });
  };
  return (
    <Content
      contentContainerStyle={{ flex: 1 }}
      refreshControl={
        <RefreshControl
          style={{ backgroundColor: "#transparent" }}
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#fff" // Ios
          colors={["#282828", "#fff"]} //android
          title={""}
          progressBackgroundColor="#fff"
        />
      }
    >
      <Form style={styles.pickerContainer}>
        <PickerDefault
          headerTitle="Seleccionar una fecha"
          placeholderText="Seleccionar una fecha"
          value={dateSelected}
          items={items}
          onChangeValue={onValueChange}
        />
      </Form>
      <View style={styles.titleContainer}>
        <Text style={styles.light}>{`Ranking`}</Text>
        <Text style={styles.bold}>{` General`}</Text>
      </View>
      <ScrollView>
        {ranking.state === 'hasValue' && renderItems(ranking.contents.data)}
      </ScrollView>
    </Content>
  );
}

export default AllChampionshipList;
