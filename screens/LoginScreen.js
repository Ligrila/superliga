import React from 'react';
import {
    View,
    StyleSheet,
    AsyncStorage,
    Button
  } from 'react-native';


import Logo from '../components/Form/Logo';
import Form from '../components/Form/Form';
import Wallpaper from '../components/Form/Wallpaper';
import ButtonSubmit from '../components/Form/ButtonSubmit';
import SignupSection from '../components/Form/SignupSection';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
      title: 'Please sign in',
      header: null
    };
    constructor(props) {
      super(props);
      this._onSubmit = this._onSubmit.bind(this);
    }
    

    render() {
      return (
        <Wallpaper>
          <Logo />
          <Form />
          <ButtonSubmit onPress={this._onSubmit} />
          <SignupSection />
        </Wallpaper>
      );
    }
  
    async _onSubmit (){
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('Main');
    };
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    }
  });