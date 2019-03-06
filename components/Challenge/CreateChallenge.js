import React, { Component } from 'react';
import Reflux from 'reflux';
import {  View } from 'react-native';
import {connectStyle,List,  Text,Button, Content} from 'native-base'



import Title from '../Title';
import { CreateChallengeStore, CreateChallengeActions } from '../../store/CreateChallengeStore';
import { AllChampionshipsStore,AllChampionshipsActions } from '../../store/AllChampionshipsStore';

import Notice from '../Notice';
import { UsersStore } from '../../store/UserStore';






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

  renderItems(){
    const styles = this.props.style;
    if(this.state.AllChampionships.data.length == 0){
      return (
        <Notice text="No hemos encontrado ningun torneo" />
      )
    }
    onChallenge = (championship) => {
      
    }


    let isFirst = true;
    return this.state.AllChampionships.data.map((championship)=>{
      
      const button = (styles) => {
        return (
          <Button transparent style={styles.button} onPress={()=>onChallenge(championship)}>
            <Text style={styles.buttonText}>DESAFIAR ></Text>
          </Button>
        )
      };
      const buttonRender = (championship.user_id != this.state.user.id) ? button(styles) : null;

      championship.user = {
        first_name: championship.first_name,
        last_name: championship.last_name,
      }
      isFirst = false;
      return (

        <View style={styles.row} key={championship.id}>
          <View style={styles.col1}>
            <Text style={styles.text}>{championship.name}</Text>
          </View>
          <View style={styles.col2}>
            <Text style={styles.text}>{championship.users_count}</Text>
          </View>
          <View style={styles.col3}>
            <Text style={styles.text}>{championship.points}</Text>
          </View>
          <View style={styles.col4}>
            {buttonRender}
          </View>

        </View>
      )
    })
  }
  
  render() {
    const styles = this.props.style;
    return (
      <Content style={styles.container}>
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