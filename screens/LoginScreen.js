import React from 'react';
import {
    View,
    StyleSheet,
    AsyncStorage
  } from 'react-native';


import {connectStyle,Header,Container,Content,Button,Form, Item, Input,Text,Icon,Toast, Footer} from 'native-base';
import Expo from 'expo';

import Wallpaper from '../components/Wallpaper';
const bgSrc = require('../assets/images/login/bg.png');

import Api from '../api/Api';
import Enviroment from '../constants/Enviroment';

import { UsersActions } from '../store/UserStore';

class LoginScreen extends React.Component {
    static navigationOptions = {
      title: 'Please sign in',
      header: null
    };
    api = new Api;
    state = {
      email: 'test@mocla.us',
      password: 'asdasd'
    }
    constructor(props) {
      super(props);
      this._onSubmit = this._onSubmit.bind(this);
      this.facebookLogin = this.facebookLogin.bind(this);
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
          <Content padder contentContainerStyle={styles.login}>
            <View style={styles.container}>
                <Text style={styles.title}>Logueate con tu usuario {"\n"}
                  o crea una cuenta nueva:</Text>
                <Form>
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
                      <Text style={styles.submitButtonText}>Ingresar</Text>
                </Button>

                <Text style={styles.registerTitle}>O no tenes cuenta :</Text>
                
                <Button rounded block large info onPress={this._onRegister} style={styles.registerButton}>
                      <Text style={styles.registerButtonText}>Registrarme</Text>
                </Button>

                  <View style={styles.socialLoginContainer}>
                  <Text style={styles.socialLoginTitle}>O ingresa con:</Text>
                    <View style={styles.socialLoginIcons}>
                      <Button iconCenter rounded light onPress={this.facebookLogin} style={styles.socialButton}>
                        <Icon name='facebook-official' type='FontAwesome' style={styles.socialButtonIcon} />
                      </Button>
                    </View>
                  </View>
              </View>
          </Content>
          <Footer>
            <Text>{Enviroment.channel}</Text>
          </Footer>
         </Wallpaper>
        </Container>
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
          UsersActions.update();
          this.props.navigation.navigate('Main');
        }
      }
    }
    _onRegister = ()=>{
     this.props.navigation.navigate('Register');
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
          UsersActions.update();
          this.props.navigation.navigate('Main');
        } else{
          Toast.show({
            text: 'Email o contraseña inválidos',
            buttonText: 'Aceptar'
          });
        }
        

    };
  }


  export default connectStyle('SuperLiga.LoginScreen')(LoginScreen);