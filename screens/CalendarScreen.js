import React from 'react';
import { ScrollView, StyleSheet,Text } from 'react-native';

export default class CalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Calendario',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Calendar</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
