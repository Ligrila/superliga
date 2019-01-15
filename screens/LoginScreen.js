import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage
  } from 'react-native';


import {connectStyle,Header,Container,Content,Button,Form, Item, Input,Text,Icon,Toast, Footer} from 'native-base';
import Expo from 'expo';

import Wallpaper from '../components/Wallpaper';
import Loader from '../components/Loader';
const bgSrc = require('../assets/images/login/bg.png');

import Api from '../api/Api';
import Enviroment from '../constants/Enviroment';

import { UsersActions } from '../store/UserStore';

class LoginScreen extends React.Component {
    static navigationOptions = {
      title: 'Ingresar',
      header: null
    };
    api = new Api;
    state = {
      email: '',
      password: '',
      loading:false,
    }
    constructor(props) {
      super(props);
      this._onSubmit = this._onSubmit.bind(this);
      this.facebookLogin = this.facebookLogin.bind(this);
      this.googleLogin = this.googleLogin.bind(this);
    }
    onForgotPassword = ()=>{
      this.props.navigation.navigate('Browser',{url: Enviroment.apiUrl  + '/../users/forgot-password', return: 'Login' });

    }
    onTermsAndConditions = ()=>{
      this.props.navigation.navigate('Browser',{url: Enviroment.apiUrl  + '/../pages/display/terms-and-conditions', return: 'Login' });

    }
    onEmailChange = async (email)=>{
      await  this.setState({email});

    }
    onPasswordChange = async (password)=>{
      await this.setState({password});

    }
    renderFooter = () => {
      if(Enviroment.channel == ''){
        return null
      }
      return (<Footer>
      <Text>{Enviroment.channel}</Text>
      </Footer>)
    }

    render() {
      const styles = this.props.style;
      
      return (
        <Container>
        <Wallpaper source={bgSrc}>
          <Loader loading={this.state.loading} />
          <Content padder contentContainerStyle={styles.login}>
            <View style={styles.container}>
                <Text style={styles.title}>Logueate con tu usuario {"\n"}
                  o crea una cuenta nueva:</Text>
                <Form>
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
                </Form>
                <Button rounded block large onPress={this._onSubmit} style={styles.submitButton}>
                      <Text style={styles.submitButtonText}>Ingresar</Text>
                </Button>

                <TouchableOpacity
                onPress={this.onForgotPassword}
                ><Text style={styles.registerSubTitle}>¿Olvidaste tu contraseña?</Text></TouchableOpacity>


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
                      <View style={styles.socialIconSeparator}></View>
                      <Button iconCenter rounded light onPress={this.googleLogin} style={styles.socialButton}>
                        <Icon name='google-' type='Entypo' style={styles.socialButtonIcon} />
                      </Button>
                    </View>
                  </View>
                  <View style={styles.termsAndConditionsContainer}>
                    <TouchableOpacity
                    onPress={this.onTermsAndConditions}
                    ><Text style={styles.registerSubTitle}>Al ingresar aceptas nuestros términos y condiciones</Text></TouchableOpacity>
                  </View>
              </View>
          </Content>
          {this.renderFooter()}
         </Wallpaper>
        </Container>
      );
    }


    async googleLogin() {
      try {
        const result = await Expo.Google.logInAsync({
          androidClientId: Enviroment.androidClientId,
          androidStandaloneAppClientId: Enviroment.androidStandaloneAppClientId,
          iosClientId: Enviroment.iosClientId,
          iosStandaloneAppClientId: Enviroment.iosStandaloneAppClientId,
          scopes: ['profile', 'email'],
        });

        if (result.type === 'success') {
          this.setState({loading:true});
          const accessToken =  result.accessToken;
          var user = await this.api.googleLogin(accessToken);
          if(user.success){
            try{
              await AsyncStorage.setItem('tokenExpire', `${user.data.expire}`);
              await AsyncStorage.setItem('token', user.data.access_token);
              await AsyncStorage.setItem('refreshToken', user.data.refresh_token);
            } catch(e){
              console.log(e);
            }
            UsersActions.update();
            UsersActions.isLoggedIn(true);
            this.setState({loading:false});
            this.props.navigation.navigate('Main');
          } else{
            console.warn("Error google login", user);
          }
        } else {
          //return {cancelled: true};
        }
      } catch(e) {
        //return {error: true};
        console.log("Error google login logInAsync",e);
      }
    }

    async facebookLogin() {
      const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('882017118635234', {
          permissions: ['email'],
          //behavior: 'web'
        });
      if (type === 'success') {
        this.setState({loading:true});
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
          UsersActions.isLoggedIn(true);
          this.setState({loading:false});
          this.props.navigation.navigate('Main');
        } else{
          console.warn("Error facebook login", user);
        }
      }
    }
    _onRegister = ()=>{
     this.props.navigation.navigate('Register');
    }
    async _onSubmit (){
        let {email,password} = this.state;
        var user = await this.api.login(email,password).catch(e=>{
          console.log('Exeption',e);
        });
        if(user && user.success){
          try{
            await AsyncStorage.setItem('tokenExpire', `${user.data.expire}`);
            await AsyncStorage.setItem('token', user.data.access_token);
            await AsyncStorage.setItem('refreshToken', user.data.refresh_token);
          } catch(e){
            console.log(e);
          }
          UsersActions.update();
          UsersActions.isLoggedIn(true);
          this.props.navigation.navigate('Main');
        } else{
          Toast.show({
            text: 'Email o contraseña inválidos',
            position: "top",
            type: 'danger',
            buttonText: 'Aceptar'
          });
        }
        

    };
  }


  export default connectStyle('SuperLiga.LoginScreen')(LoginScreen);
