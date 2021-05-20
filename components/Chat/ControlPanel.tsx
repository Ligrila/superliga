import React from 'react';
import { Text } from "native-base";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from 'react-native';

const ControlPanel = (props) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.controlText}>Control Panel</Text>
      <TouchableOpacity style={styles.button} onPress={props.closeDrawer}>
        <Text>Close Drawer</Text>
      </TouchableOpacity>
    </ScrollView>
  )

}

export default ControlPanel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  controlText: {
    color: 'white',
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  }
})