import React, { Component } from 'react';
import Reflux from 'reflux';
import { View } from 'react-native';
import {connectStyle,Form,Item,Label, Input, DatePicker, Icon, Button, Toast} from 'native-base'

import { NavigationActions } from 'react-navigation'



import Title from '../Title';
import { CreateChampionshipStore,CreateChampionshipActions } from '../../store/CreateChampionshipStore';
import Loader from '../Loader';

class CreateChampionship extends Reflux.Component {
 state = {
     name: null,
     fromDate: null,
     toDate: null,
 }
  constructor(props) {
    super(props);
    this.store = CreateChampionshipStore;

  }

  componentDidMount(){
    CreateChampionshipActions.created.listen(async (championship)=>{
      this.props.navigation.navigate('ChampionshipView',{championship:championship,created:true})
    })
  }
  setName = (name) =>{
    this.setState({name})
  }
  setFromDate = async (_fromDate) =>{
      const pad = function(num) { return ('00'+num).slice(-2) };
      const day = pad(_fromDate.getDate());
      const month = pad(_fromDate.getMonth() + 1);
      const year = _fromDate.getFullYear();
      const fromDate = `${year}-${month}-${day}`
      this.setState({fromDate})
  }
  setToDate = async (_toDate) =>{
    const pad = function(num) { return ('00'+num).slice(-2) };

    const day = pad(_toDate.getDate());
    const month = pad(_toDate.getMonth() + 1);
    const year = _toDate.getFullYear();
    const toDate = `${year}-${month}-${day}`
    await this.setFromDate(new Date())
    await this.setState({toDate})
  }
  onNextClick = () =>{
    if(!this.state.name || !this.state.fromDate || !this.state.toDate){
      Toast.show({
        text: 'Por favor rellena todos los campos',
        position: "bottom",
        type: 'danger',
        buttonText: 'Aceptar'
      });
      return;
    }
    if(this.state.fromDate >= this.state.toDate){
      Toast.show({
        text: 'La fecha de fin del torneo debe ser mayor a la de comienzo',
        position: "bottom",
        type: 'danger',
        buttonText: 'Aceptar'
      });
      return;
    }
    CreateChampionshipActions.create(this.state.name,this.state.fromDate,this.state.toDate)
  }
/*<View style={styles.calendarContainer}>
                <View style={styles.calendar}>
                    <Icon name="calendar" type="FontAwesome" style={styles.calendarIcon} />
                    <DatePicker
                                defaultDate={new Date()}
                                minimumDate={new Date()}
                                locale={"es"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Desde"
                                textStyle={styles.label}
                                placeHolderTextStyle={styles.label}
                                onDateChange={this.setFromDate}
                                disabled={false}
                        />
                </View>
               </View>*/
  render() {
    const styles = this.props.style;
    return (
      <View style={styles.container} >
        <Title text={'CREA TU TORNEO \n SUPERLIGA'}></Title>
        <Loader loading={this.state.CreateChampionship.loading}/>
        <Form>
              <Input placeholder='Nombre del Torneo'
                style={styles.input}
                placeHolderTextStyle={styles.placeholder}
                 placeholderTextColor={styles.placeholder.color}
                 onChangeText={this.setName}
                 />
              

               <View style={styles.calendarContainer}>
                <View style={styles.calendar}>
                    <Icon name="calendar" type="FontAwesome" style={styles.calendarIcon} />
                    <DatePicker
                                defaultDate={new Date()}
                                minimumDate={new Date()}
                                locale={"es"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Hasta"
                                textStyle={styles.label}
                                placeHolderTextStyle={styles.label}
                                onDateChange={this.setToDate}
                                disabled={false}
                        />
                </View>
               </View>
               <View style={styles.buttonContainer}>
                    <Button 
                      style={styles.button} onPress={this.onNextClick}
                      disabled={this.state.CreateChampionship.loading}
                      >
                        <Icon name="md-arrow-forward" type="Ionicons" style={styles.buttonIcon} />
                    </Button>
                </View>
          </Form>
      </View>
    );
  }
}


export default connectStyle('SuperLiga.CreateChampionship')(CreateChampionship);