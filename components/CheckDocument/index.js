import React, { Component } from 'react'
import Reflux from 'reflux'
import { UsersStore } from '../../store/UserStore';

export default class CheckDocument extends Reflux.Component {
  constructor(props){
      super(props)
      this.stores = [UsersStore]
  }
  componentDidMount(){
    if(this.state.hasInformation && !this.state.user.document){

            this.props.navigation.navigate('EditProfile',
            {
                title:'Debido a un cambio en nuestros términos y condiciones debes suministrarnos tu documento para que podamos entregarte los premios'
            }
        );


        return;
      }
  }

  render() {
    return null
    
  }
}