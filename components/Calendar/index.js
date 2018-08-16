import React, { Component } from 'react';
import Reflux from 'reflux';
import { View } from 'react-native';
import {connectStyle,Text} from 'native-base'

import { DatesStore, DatesActions } from '../../store/DatesStore';
import CalendarItem from './CalendarItem';

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
    let datesItems = null;
    if(typeof this.state.Dates == 'object'){
    datesItems = this.state.Dates.map(item => (
        <CalendarItem key={item.id} item={item} />
        )
      );
    }
    return (
      <View>
        <Text> Calendar </Text>
        {datesItems}
      </View>
    );
  }
}


export default connectStyle('SuperLiga.Calendar')(Calendar);