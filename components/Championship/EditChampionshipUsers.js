import React, { Component } from 'react';
import Reflux from 'reflux';
import { View } from 'react-native';
import {connectStyle,List,ListItem, Text,Left,Body,Right,Switch} from 'native-base'





import Title from '../Title';
import { EditChampionshipUsersStore,EditChampionshipUsersActions } from '../../store/EditChampionshipUsersStore';
import Loader from '../Loader';
import Avatar from '../Avatar';


import { ChampionshipUsersStore, ChampionshipUsersActions } from '../../store/ChampionshipUsersStore';

const trophyAvatarSrc = require('../../assets/images/championship/trophy-avatar.png')


class EditChampionshipUsers extends Reflux.Component {
 
  constructor(props) {
    super(props);

    this.stores = [ChampionshipUsersStore,EditChampionshipUsersStore];
    this.championship = this.props.championship

  }

  componentDidMount(){
    ChampionshipUsersActions.list(this.championship.id)
  }
  
  toggleUser = async (item,v,index)=>{
    this.state.ChampionshipUsers.data.championship_users[index].enabled = v
    await EditChampionshipUsersActions.toggle(item.user.id,this.championship.id,v)
    if(!this.EditChampionshipUsersStore.data.success){
      this.state.ChampionshipUsers.data.championship_users[index].enabled = !v
    }


  }

  renderItems(){
    if(!this.state.ChampionshipUsers.hasData){
      return;
    }
    const styles = this.props.style
    
    return this.state.ChampionshipUsers.data.championship_users.map(
      (item,index) => {
        const removeButton = (item)=>{
          if(this.state.ChampionshipUsers.data.user_id == item.user.id){
            return null;
          }

          return <Switch value={item.enabled} onValueChange={(v)=>{this.toggleUser(item,v,index)}}></Switch>

        }
        return (
          <ListItem icon key={item.user.id}>
            
            <Left>
              <Avatar mini avatar={{uri:item.user.avatar}}></Avatar>
            </Left>
            <Body>
            <Text>{item.user.first_name} {item.user.last_name}</Text>
            </Body>
            <Right>

              {removeButton(item)}
            </Right>
          </ListItem>
        )
      }
    )
  }
  
  render() {
    const styles = this.props.style;


    const title = `EDITAR PARTICIPANTES\n ${this.championship.name}`
    return (
      <View style={styles.container} >
        <Title text={title}></Title>
        <Loader loading={this.state.EditChampionshipUsers.loading || this.state.ChampionshipUsers.loading}/>
        <List>
          {this.renderItems()}
        </List>
      </View>
    );
  }
}


export default connectStyle('SuperLiga.EditChampionshipUsers')(EditChampionshipUsers);