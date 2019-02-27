import React from 'react';
import { Icon } from 'expo';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';


export default class TabBarIcon extends React.Component {
  render() {
    console.log(this.props.type)
    return (
      <Icon.FontAwesome
        name={this.props.name}
        size={Layout.s(50)}
        color={this.props.focused ? '#fff' : Colors.tabIconDefault}
      />
    );
  }
}