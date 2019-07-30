import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { Platform } from 'react-native'



export default class TabBarIcon extends React.Component {
  render() {
    return (
      <FontAwesome
        name={this.props.name}
        size={Platform.isPad ? Layout.s(25): Layout.s(50)}
        color={this.props.focused ? '#fff' : Colors.tabIconDefault}
      />
    );
  }
}