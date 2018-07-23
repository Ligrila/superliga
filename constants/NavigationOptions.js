import React, {Component} from 'react';

import {TouchableOpacity,StyleSheet, View, Text, Image} from 'react-native';
import {Icon, Header} from 'native-base';






class HeaderLeft extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={superligaImg} style={styles.image} />
      </View>
    );
  }
}



export default {
    navigationOptions: ({ navigation }) => ({
      /*headerLeft: <Image source={superligaImg} style={styles.superligaImg} />,
      headerTitle: <Image source={superligaAppImg} style={styles.superligaAppImg} />,
      headerRight: <TouchableOpacity  onPress={() => {navigation.openDrawer();}}><Icon name="ios-menu" style={{ paddingRight: 10 }} /></TouchableOpacity>,
      headerStyle: {
        backgroundColor: 'transparent',
        height: 133,
        borderBottomWidth: 0 // removes the border on the bottom

      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },*/
    })
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: 'white',
      fontWeight: 'bold',
      backgroundColor: 'transparent',
      marginTop: 20,
    },
  });
  