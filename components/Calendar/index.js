import React, { Component } from 'react';
import Reflux from 'reflux';
import { View } from 'react-native';
import {connectStyle,Text} from 'native-base'

import { DatesStore, DatesActions } from '../../store/DatesStore';
import CalendarItem from './CalendarItem';
import Title from '../Title';

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

    if(typeof this.state.Dates.data == 'object'){
    datesItems = this.state.Dates.data.map(item => (
        <CalendarItem key={item.id} item={item} />
        )
      );
    }
    const styles = this.props.style;
    return (
      <View style={styles.container}>
        <Title text={'COPA DE \n LA SUPERLIGA'}></Title>
        {datesItems}
      </View>
    );
  }
}


export default connectStyle('SuperLiga.Calendar')(Calendar);