import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default class AwardScreen extends React.Component {
  static navigationOptions = {
    title: 'Premios',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Premios</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#000',
    color: '#fff'
  },
});
