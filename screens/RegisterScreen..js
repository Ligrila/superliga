import React from 'react';
import {
    View,
    StyleSheet,
    AsyncStorage
  } from 'react-native';


import {connectStyle,Header,Container,Content,Button,Form, Item, Input,Text,Icon,Toast} from 'native-base';
import Expo from 'expo';

import Wallpaper from '../components/Wallpaper';
const bgSrc = require('../assets/images/login/bg.png');

import Api from '../api/Api';


class RegisterScreen extends React.Component {
    static navigationOptions = {
      title: 'Please sign in',
      header: null
    };
    api = new Api;
    state = {
      first_name: null,
      last_name: null,
      email: null,
      password: null,
      referral_username: null
    }
    constructor(props) {
      super(props);
      this._onSubmit = this._onSubmit.bind(this);
    }

    onFirstNameChange = async (first_name)=>{
      await  this.setState({first_name});

    }
    onLastNameChange = async (last_name)=>{
      await  this.setState({last_name});

    }
    onEmailChange = async (email)=>{
      await  this.setState({email});

    }
    onPasswordChange = async (password)=>{
      await this.setState({password});

    }

    onReferralChange = async(referral_username)=>{
      await this.setState({referral_username});
    }


    render() {
      const styles = this.props.style;
      return (
        <Container>
        <Wallpaper source={bgSrc}>
          <Content padder contentContainerStyle={styles.login}>
            <View style={styles.container}>
                <Text style={styles.title}>Crear cuenta nueva</Text>
                <Form>
                <Item style={styles.item}>
                    <Input style={styles.input} placeholder="Nombre"
                      onChangeText={this.onFirstNameChange}
                    />
                  </Item>
                  <Item style={styles.item}>
                    <Input style={styles.input} placeholder="Apellido"
                      onChangeText={this.onLastNameChange}
                    />
                  </Item>
                  <Item style={styles.item}>
                    <Input style={styles.input} placeholder="Email"
                      onChangeText={this.onEmailChange}
                      keyboardType='email-address' 
                    />
                  </Item>
                  <Item style={styles.item}>
                    <Input style={styles.input} placeholder="Password" secureTextEntry={true} 
                      onChangeText={this.onPasswordChange}
                    />
                  </Item>
                  <Item style={styles.item}>
                    <Input style={styles.input} placeholder="Código de referencia (Opcional)" 
                      onChangeText={this.onReferralChange}
                    />
                  </Item>
                </Form>
                <Button rounded block large onPress={this._onSubmit} style={styles.submitButton}>
                      <Text style={styles.submitButtonText}>Registrarse</Text>
                </Button>

                <Text style={styles.registerTitle}>O ingresa si ya tienes cuenta :</Text>
                
                <Button rounded block large info onPress={this._onLoginButton} style={styles.registerButton}>
                      <Text style={styles.registerButtonText}>Ingresar</Text>
                </Button>
              </View>
          </Content>
         </Wallpaper>
        </Container>
      );
    }

   _onLoginButton = ()=>{
    this.props.navigation.navigate('Login');
   }
    async _onSubmit (){
        let {first_name, last_name, email,password,referral_username} = this.state;
        var user = await this.api.register(first_name,last_name,email,password,referral_username).catch(e=>{
          console.log(e);
        });
        console.log(user);
        if(user && user.success){
          try{
            /*await AsyncStorage.setItem('tokenExpire', `${user.data.expire}`);
            await AsyncStorage.setItem('token', user.data.access_token);
            await AsyncStorage.setItem('refreshToken', user.data.refresh_token);*/
          } catch(e){
            //console.log(e);
          }
          Toast.show({
            text: 'Ya puedes ingresar. Usa tus datos proporcionados anteriormente',
            type: 'success',
            buttonText: 'Aceptar'
          });
          this.props.navigation.navigate('Login');
        } else{
          Toast.show({
            text: 'Datos inválidos o email ya registrado',
            position: "top",
            type: 'danger',
            buttonText: 'Aceptar'
          });
        }
        

    };
  }


  export default connectStyle('SuperLiga.LoginScreen')(RegisterScreen);