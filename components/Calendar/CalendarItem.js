import React, { Component } from 'react';
import { View } from 'react-native';
import {connectStyle,Text} from 'native-base'

class CalendarItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

export default connectStyle('SuperLiga.CalendarItem')(CalendarItem)