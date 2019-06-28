import React, { Component } from 'react';
import Reflux from 'reflux';
import {  View, Alert } from 'react-native';
import {connectStyle,Form, Picker, Icon, Content} from 'native-base'



import Title from '../Title';
import { AllChampionshipsStore,AllChampionshipsActions } from '../../store/AllChampionshipsStore';

import Notice from '../Notice';
import { UsersStore } from '../../store/UserStore';
import Loader from '../Loader';
import ChampionshipItem from './ChampionshipItem';
import { ChampionshipDatesStore, ChampionshipDatesActions } from '../../store/ChampionshipDatesStore';





class AllChampionshipList extends Reflux.Component {
  state = {
    dateSelected: 'general'
  }
  constructor(props) {
    super(props);
    this.stores = [AllChampionshipsStore,UsersStore,ChampionshipDatesStore];
    this.championship = this.props.championship;

  }

  componentDidMount(){
    AllChampionshipsActions.list(null,true)
    ChampionshipDatesActions.index();
  
  }

  

  

  renderItems = () => {
    const styles = this.props.style;
    if(this.state.AllChampionships.data.length == 0){
      return (
        <Notice text="No hemos encontrado ningun torneo" />
      )
    }




    let position = 0

    return this.state.AllChampionships.data.map((ranking,index)=>{
      ranking.position = ranking.position || ++position
      position = ranking.position
      const championship = {...ranking.championship,position:ranking.position,points:ranking.points}

      const altrow = index % 2 === 0
      return (

       <ChampionshipItem key={championship.id} altrow={altrow} championship={championship} />
      )
    })
  }

  onValueChange = function(value){
    this.setState({
      dateSelected: value
    })
    switch(value){
      case 'general':
          AllChampionshipsActions.list(null,true)
        break;
      default:
          AllChampionshipsActions.listForDate(value,true)
        break;
    }
    

  }
  getPickerItems(){
    let datesItems = [];
    datesItems.push(
      <Picker.Item  key="general" label="Ranking General" value="general" />
    )

    if(typeof this.state.ChampionshipDates.data == 'object'){
        datesItems.push( this.state.ChampionshipDates.data.map(item => (
                <Picker.Item key={item.id} label={item.name} value={item.id} />
             )
            ));
        }
    return datesItems  
    }
  
  render() {
    const styles = this.props.style;
    return (
      <Content style={styles.container}>
        <Title text={'RANKING'}></Title>
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
        <View style={styles.list}>
          {this.renderItems()}
        </View>
      </Content>
    );
  }
}


export default connectStyle('SuperLiga.CreateChallenge')(AllChampionshipList);