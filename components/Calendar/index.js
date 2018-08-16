import React, { Component } from 'react';
import Reflux from 'reflux';
import { View } from 'react-native';
import {connectStyle,Text} from 'native-base'

import { DatesStore, DatesActions } from '../../store/DatesStore';

class Calendar extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.store = DatesStore;
  }

  componentDidMount(){
    DatesActions.calendar();
  }

  render() {
    console.log('dates',this.state.Dates);
    return (
      <View>
        <Text> Calendar </Text>
      </View>
    );
  }
}


export default connectStyle('SuperLiga.Calendar')(Calendar);