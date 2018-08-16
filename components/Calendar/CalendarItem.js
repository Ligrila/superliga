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
        <Text> {this.props.item.name} </Text>
        <View>
            <View>
              <Text></Text>
            </View>
        </View>
      </View>
    );
  }
}

export default connectStyle('SuperLiga.CalendarItem')(CalendarItem)