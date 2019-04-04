import React, { Component } from 'react';
import Reflux from 'reflux';
import { View } from 'react-native';
import {connectStyle,Form,Item,Label, Input, DatePicker, Icon, Button, Toast} from 'native-base'

import { NavigationActions } from 'react-navigation'



import Title from '../Title';
import { CreateChampionshipStore,CreateChampionshipActions } from '../../store/CreateChampionshipStore';
import Loader from '../Loader';
import Avatar from '../Avatar';
import ChangeAvatar from '../Avatar/ChangeAvatar';
import { ChampionshipsActions } from '../../store/ChampionshipsStore';

const trophyAvatarSrc = require('../../assets/images/championship/trophy-avatar.png')


class CreateChampionship extends Reflux.Component {
 state = {
     id: null,
     name: null,
     picture: null,
     pictureChanged: false,
 }
  editMode = false;
  constructor(props) {
    super(props);
    this.editMode = this.props.editMode || false
    if(props.championship){
      this.state = props.championship;
      this.state.picture  = props.championship.avatar
    }
    this.store = CreateChampionshipStore;

  }

  componentDidMount(){
    if(this.editMode){
      CreateChampionshipActions.edited.listen(async (championship)=>{
        ChampionshipsActions.list();
        this.props.navigation.navigate('ChampionshipHome')
      })
    } else{
      CreateChampionshipActions.created.listen(async (championship)=>{
        this.props.navigation.navigate('ChampionshipView',{championship:championship,created:true})
      })
    }
  }
  setName = (name) =>{
    this.setState({name})
  }
  setPicture = (picture) =>{
    const pictureChanged = true
    this.setState({picture})
    this.setState({pictureChanged})
    
  }
  
  onNextClick = () =>{
    if(!this.state.name){
      Toast.show({
        text: 'Por favor escribe un nombre',
        position: "bottom",
        type: 'danger',
        buttonText: 'Aceptar'
      });
      return;
    }
    if(this.editMode){
      CreateChampionshipActions.edit(this.state.id,this.state.name,this.state.pictureChanged ? this.state.picture : null )
    } else{
      CreateChampionshipActions.create(this.state.name,this.state.picture)
    }
  }

  
  
  render() {
    const styles = this.props.style;
    let avatar = trophyAvatarSrc
    if(this.state.picture){
      avatar = {uri: this.state.picture}
    }

    const title = this.editMode ? 'EDITAR \n TORNEO' : 'CREA TU TORNEO \n SUPERLIGA'
    return (
      <View style={styles.container} >
        <Title text={title}></Title>
        <Loader loading={this.state.CreateChampionship.loading}/>
        <Form>
              <Avatar avatar={avatar}></Avatar>
              <ChangeAvatar onChange={this.setPicture}></ChangeAvatar>
              <Input placeholder='Nombre del Torneo'
                style={styles.input}
                placeHolderTextStyle={styles.placeholder}
                 placeholderTextColor={styles.placeholder.color}
                 onChangeText={this.setName}
                 value={this.state.name}
                 />
              


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