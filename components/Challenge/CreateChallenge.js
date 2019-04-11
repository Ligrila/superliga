import React, { Component } from 'react';
import Reflux from 'reflux';
import {  View, Alert } from 'react-native';
import {connectStyle,Toast,  Text,Button, Content} from 'native-base'



import Title from '../Title';
import { CreateChallengeStore, CreateChallengeActions } from '../../store/CreateChallengeStore';
import { AllChampionshipsStore,AllChampionshipsActions } from '../../store/AllChampionshipsStore';

import Notice from '../Notice';
import { UsersStore } from '../../store/UserStore';
import Loader from '../Loader';
import ChampionshipItem from '../Championship/ChampionshipItem';






class CreateChallenge extends Reflux.Component {
 state = {

 }
  constructor(props) {
    super(props);
    this.stores = [CreateChallengeStore,AllChampionshipsStore,UsersStore];
    this.championship = this.props.championship;

  }

  componentDidMount(){
    AllChampionshipsActions.list(null,true)

  }

  formatDate(s){
    const pad = function(num) { return ('00'+num).slice(-2) };
    const d = new Date(s.split(" ")[0]);
    const day = pad(d.getDate());
    const month = pad(d.getMonth() + 1);
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  onCreateChallenge(response){
      //console.log({response})
      if(response.success){
        Toast.show({
          text: "La invitación fue enviada correctamente.",
          duration: 5000,
          type: "success"
        })
    
      } else{
        Toast.show({
          text: "No se pudo enviar la invitación a este torneo.",
          duration: 5000,
          type: "danger"
        })
      }
      if(typeof(this.createdUnsubscribe)=='function'){
        this.createdUnsubscribe();
      }
  }
  createChallenge = async (championship) => {
    await CreateChallengeActions.reset()
    CreateChallengeActions.create(championship.id,this.championship.id /* quien desafia */)
    this.createdUnsubscribe = CreateChallengeActions.response.listen(this.onCreateChallenge)

    

  }

  onChallenge = (championship) => {

    Alert.alert(
      'Desafiar torneo',
      '¿Estás seguro de desafiar este torneo?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {text: '¡Si, desafiar!', onPress: () => this.createChallenge(championship) },
      ],
      {cancelable: false},
    );
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

       <ChampionshipItem key={championship.id} altrow={altrow} championship={championship} onChallenge={()=>this.onChallenge(championship)} />
      )
    })
  }
  
  render() {
    const styles = this.props.style;
    return (
      <Content style={styles.container}>
      <Loader loading={this.state.CreateChallenge.loading} />
        <Title text={'DESAFIA \n OTROS EQUIPOS'}></Title>
        <View style={styles.list}>
          <View style={styles.row}>
            <View style={styles.colh1}>
            </View>
            <View style={styles.colh2}>
              <Text style={styles.text}>nr.jug</Text>
            </View>
            <View style={styles.colh3}>
              <Text style={styles.text}>pnts.</Text>
            </View>
          </View>
          {this.renderItems()}
        </View>
      </Content>
    );
  }
}


export default connectStyle('SuperLiga.CreateChallenge')(CreateChallenge);