import React from 'react';
import {
    View,
    StyleSheet,
    AsyncStorage
  } from 'react-native';


import {Button,Text,Icon,Toast} from 'native-base';
import Expo from 'expo';

import Logo from '../components/Form/Logo';
import Form from '../components/Form/Form';
import Wallpaper from '../components/Form/Wallpaper';
import ButtonSubmit from '../components/Form/ButtonSubmit';
import SignupSection from '../components/Form/SignupSection';

import Api from '../api/Api';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
      title: 'Please sign in',
      header: null
    };
    api = new Api;
    defaultState = {
      email: 'test@mocla.us',
      password: 'asdasd'
    }
    constructor(props) {
      super(props);
      this._onSubmit = this._onSubmit.bind(this);
      this.facebookLogin = this.facebookLogin.bind(this);
      this.onFormChange = this.onFormChange.bind(this);
      this.state = this.defaultState;
    }
    
    onFormChange(state){
      this.setState(state);

    }

    render() {
      return (
        <Wallpaper>
          <Logo />
          <Form onChange={this.onFormChange}/>
          <ButtonSubmit onPress={this._onSubmit} />
          <Button text="" onPress={this._onSubmit} icon={{name:"facebook-official",type:"FontAwesome"}} />
          <View style={styles.socialLogin}>
          <Button iconLeft primary onPress={this.facebookLogin}>
            <Icon name='facebook-official' type='FontAwesome' />
            <Text>Facebook</Text>
          </Button>
          </View>
          <SignupSection />
        </Wallpaper>
      );
    }

    async facebookLogin() {
      const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('882017118635234', {
          permissions: ['email'],
        });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        /*console.log(`https://graph.facebook.com/me?access_token=${token}&fields=name,email,first_name,last_name`);
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=name,email,first_name,last_name`);
        var user = await response.json();
        console.log(user);*/
        var user = await this.api.facebookLogin(token);
        if(user.success){
          try{
            await AsyncStorage.setItem('tokenExpire', `${user.data.expire}`);
            await AsyncStorage.setItem('token', user.data.access_token);
            await AsyncStorage.setItem('refreshToken', user.data.refresh_token);
          } catch(e){
            console.log(e);
          }
          this.props.navigation.navigate('Main');
        }
      }
    }
  
    async _onSubmit (){
        //await AsyncStorage.setItem('userToken', 'abc');
  //      this.props.navigation.navigate('Main');
        console.log(this.state);
        let {email,password} = this.state;
        var user = await this.api.login(email,password).catch(e=>{
          console.log(e);
        });
        console.log(user);
        if(user && user.success){
          try{
            await AsyncStorage.setItem('tokenExpire', `${user.data.expire}`);
            await AsyncStorage.setItem('token', user.data.access_token);
            await AsyncStorage.setItem('refreshToken', user.data.refresh_token);
          } catch(e){
            console.log(e);
          }
          this.props.navigation.navigate('Main');
        } else{
          console.log("Toast");
          Toast.show({
            text: 'Email o contraseña inválidos',
            buttonText: 'Aceptar'
          });
        }
        

    };
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    socialLogin:{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });