import React, { Component } from 'react'
import Reflux from 'reflux'
import {connectStyle,Text, Form, Picker, Icon} from 'native-base'
import { View } from 'react-native'
import { DatesListStore, DatesListActions } from '../../store/DatesListStore';
import RankingItem from './RankingItem';
import { RankingStore, RankingActions } from '../../store/RankingStore';


class Ranking extends Reflux.Component {
  constructor(props){
    super(props)
    this.state = {
        dateSelected: 'general',
        Ranking: {hasData:false}
      };
    this.stores = [DatesListStore,RankingStore]
  }

  componentDidMount(){
      DatesListActions.index();
      RankingActions.general();
  }

  onValueChange = function(value){
    console.log({value})
    this.setState({
      dateSelected: value
    })
    switch(value){
      case 'general':
        RankingActions.general();  
        break;
      case 'week':
        RankingActions.week();  
        break;
      default:
        RankingActions.forDay(value);
    }
    

  }
  getPickerItems(){
    let datesItems = [];
    datesItems.push(
      <Picker.Item  key="general" label="Ranking General" value="general" />
    )
    datesItems.push(
      <Picker.Item  key="week" label="Ranking Semanal" value="week" />
    )

    if(typeof this.state.DatesList.data == 'object'){
        datesItems.push( this.state.DatesList.data.map(item => (
                <Picker.Item key={item.id} label={item.name} value={item.id} />
             )
            ));
        }
    return datesItems  
    }

    getTopTen(){
        let items = null
        if(this.state.Ranking.hasData){
            let number = 0;
            items = this.state.Ranking.data.users.map(
                item => {
                    number++
                    return (
                    <RankingItem key={item.user_id} item={item} number={number}/>
                    )
                 }
            )
        }
        return items
    }
  render() {
    const styles = this.props.style
    //const currentDay = this.state.Ranking.hasData ? this.state.Ranking.data.date.id : null
    return (
      <View>
        <Form style={styles.pickerContainer}>
            <Picker   
                note
                mode="dropdown"
                placeholder='Seleccionar fecha...'
                iosHeader="Seleccionar una fecha"
                Header="Seleccionar una fecha"
                style={styles.picker}
                iosIcon={<Icon style={styles.pickerIcon} name="ios-arrow-dropdown" />}

                textStyle={styles.pickerText}
                itemTextStyle={styles.pickerItemText}
                selectedValue={this.state.dateSelected}
                onValueChange={this.onValueChange.bind(this)}
            >
                 {this.getPickerItems()}
            </Picker>
   
        </Form>
        <Text style={styles.bold}>Ranking</Text>
        <Text style={styles.light}>Ganadores</Text>
        <View>
            {this.getTopTen()}
        </View>
      </View>
    )
  }
}


export default connectStyle("SuperLiga.Ranking")(Ranking)