import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';

export default {
    navigationOptions: ({ navigation }) => ({
      headerRight: <TouchableOpacity  onPress={() => {navigation.openDrawer();}}><Icon name="ios-menu" style={{ paddingRight: 10 }} /></TouchableOpacity>,
      headerStyle: {
        backgroundColor: 'gray',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    })
  };