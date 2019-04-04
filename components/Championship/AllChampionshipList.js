import React, { Component } from 'react';
import Reflux from 'reflux';
import {  View, Alert } from 'react-native';
import {connectStyle,Toast,  Text,Button, Content} from 'native-base'



import Title from '../Title';
import { AllChampionshipsStore,AllChampionshipsActions } from '../../store/AllChampionshipsStore';

import Notice from '../Notice';
import { UsersStore } from '../../store/UserStore';
import Loader from '../Loader';
import ChampionshipItem from './ChampionshipItem';






class AllChampionshipList extends Reflux.Component {
 state = {

 }
  constructor(props) {
    super(props);
    this.stores = [AllChampionshipsStore,UsersStore];
    this.championship = this.props.championship;

  }

  componentDidMount(){
    AllChampionshipsActions.list(null,true)

  }

  

  

  renderItems = () => {
    const styles = this.props.style;
    if(this.state.AllChampionships.data.length == 0){
      return (
        <Notice text="No hemos encontrado ningun torneo" />
      )
    }





    return this.state.AllChampionships.data.map((ranking,index)=>{
      
      const championship = {...ranking.championship,position:ranking.position,points:ranking.points}
      

      const altrow = index % 2 === 0
      return (

       <ChampionshipItem key={championship.id} altrow={altrow} championship={championship} />
      )
    })
  }
  
  render() {
    const styles = this.props.style;
    return (
      <Content style={styles.container}>
        <Title text={'RANKING \n GENERAL'}></Title>
        <View style={styles.list}>
          {this.renderItems()}
        </View>
      </Content>
    );
  }
}


export default connectStyle('SuperLiga.CreateChallenge')(AllChampionshipList);