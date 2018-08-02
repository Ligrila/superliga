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
import Recaptcha from 'react-google-invisible-recaptcha';


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
      password: null
    }
    constructor(props) {
      super(props);
      this._onSubmit = this._onSubmit.bind(this);
      this.facebookRegister = this.facebookRegister.bind(this);
    }

    onFirstNameChange = async (email)=>{
      await  this.setState({email});

    }
    onLastNameChange = async (email)=>{
      await  this.setState({email});

    }
    onEmailChange = async (email)=>{
      await  this.setState({email});

    }
    onPasswordChange = async (password)=>{
      await this.setState({password});

    }


    render() {
      const styles = this.props.style;
      console.log(styles);
      return (
        <Container>
        <Wallpaper source={bgSrc}>
          <Content padder contentContainerStyle={styles.Register}>
            <View style={styles.container}>
                <Text style={styles.title}>Crear cuenta nueva</Text>
                <Form>
                  <Recaptcha
                  ref={ ref => this.recaptcha = ref }
                  sitekey={ '6LfCzGcUAAAAAHamT-dHFCeYWzaCGP_UTjggFzJV' }
                  onResolved={ () => console.log( 'Human detected.', this.recaptcha.getResponse() ) } />
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
                    />
                  </Item>
                  <Item style={styles.item}>
                    <Input style={styles.input} placeholder="Password" secureTextEntry={true} 
                      onChangeText={this.onPasswordChange}
                    />
                  </Item>
                </Form>
                <Button rounded block large onPress={this._onSubmit} style={styles.submitButton}>
                      <Text style={styles.submitButtonText}>Registrarse</Text>
                </Button>

                <Text style={styles.registerTitle}>O ingresa si ya tienes cuenta :</Text>
                
                <Button rounded block large info onPress={this._onRegister} style={styles.registerButton}>
                      <Text style={styles.registerButtonText}>Ingreasr</Text>
                </Button>
              </View>
          </Content>
         </Wallpaper>
        </Container>
      );
    }

   
    async _onSubmit (){
        let {first_name, last_name, email,password} = this.state;
        var user = await this.api.Register(first_name,last_name,email,password).catch(e=>{
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
          this.props.navigation.navigate('Login');
        } else{
          Toast.show({
            text: 'Datos inválidos',
            buttonText: 'Aceptar'
          });
        }
        

    };
  }


  export default connectStyle('SuperLiga.RegisterScreen')(RegisterScreen);