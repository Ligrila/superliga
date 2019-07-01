import React from 'react';
import Reflux from 'reflux'
import {
    View,
    KeyboardAvoidingView,
    StyleSheet,
    AsyncStorage
  } from 'react-native';


import {connectStyle,Header,Container,Content,Button,Form, Item, Picker,Text,Icon,Toast,Textarea, Input, Spinner} from 'native-base';
import Expo from 'expo';

import Wallpaper from '../components/Wallpaper';
const bgSrc = require('../assets/images/contactBg.png');

import Api from '../api/Api';
import AppHeader from '../components/AppHeader/AppHeader';
import { UsersStore, UsersActions } from '../store/UserStore';
import Layout from '../constants/Layout';


class EditProfileScreen extends Reflux.Component {
    static navigationOptions = {
      title: 'Contact',
    };
    api = new Api;
    state = {
      submitActive : true,
      first_name: null,
      last_name: null,
      document: null,
      mobile_number: null,

    }
    constructor(props) {
      super(props);
      this._onSubmit = this._onSubmit.bind(this);
      this.store = UsersStore
    }

    onFirstNameChange = async (first_name)=>{
      await  this.setState({first_name});

    }
    onLastNameChange = async (last_name)=>{
      await  this.setState({last_name});

    }
    onDocumentChange = async (document)=>{
      await  this.setState({document});

    }

    onMobileChange = async (mobile_number)=>{
      await  this.setState({mobile_number});

    }

    componentDidMount(){
        const stopListen = UsersActions.me.listen(
          (user)=>{
            stopListen()
            const {first_name, last_name, document, mobile_number} = user;
            this.setState({first_name,last_name,document,mobile_number})
          }
        )
        UsersActions.update()
    }



     renderSubmit(){
         const styles = this.props.style
         if(this.state.submitActive){
            return (
                <Button rounded block large onPress={this._onSubmit} style={styles.submitButton}>
                      <Text style={styles.submitButtonText}>Enviar</Text>
                </Button>
            )
         }
         return (
            <Spinner />
        )
             
     }

    render() {
      const styles = this.props.style;
      const title = this.props.navigation.getParam('title','Editar \n Perfil')
      return (
        <Container>
        <Wallpaper source={bgSrc}>
          <AppHeader navigation={this.props.navigation} drawerOpen={() => {this.props.navigation.openDrawer()}} />
          <Content contentContainerStyle={styles.content}>
            <KeyboardAvoidingView style={styles.container} behavior={Layout.isAndroid ? null : 'padding'}>
                <Text style={styles.title}>{title}</Text>
                <Form style={styles.form}>
                  <Item style={styles.item}>
                    <Input style={styles.input} placeholder="Nombre"
                      onChangeText={this.onFirstNameChange}
                      placeholderTextColor='#fff'
                      defaultValue={this.state.user.first_name}
                    />
                    </Item>
                    <Item style={styles.item}>
                    <Input style={styles.input} placeholder="Apellido"
                      onChangeText={this.onLastNameChange}
                      placeholderTextColor='#fff'
                      defaultValue={this.state.user.last_name}
                    />
                    </Item>
                    <Item style={styles.item}>
                    <Input style={styles.input} placeholder="Documento de identidad"
                      onChangeText={this.onDocumentChange}
                      placeholderTextColor='#fff'
                      defaultValue={this.state.user.document ? this.state.user.document.toString() : null }
                      keyboardType='number-pad'
                    />
                    </Item>
                    <Item style={styles.item}>
                    <Input style={styles.input} placeholder="Teléfono"
                      onChangeText={this.onMobileChange}
                      placeholderTextColor='#fff'
                      defaultValue={this.state.user.mobile_number}
                      keyboardType='phone-pad'
                    />
                  </Item>

                </Form>

                {this.renderSubmit()}


              </KeyboardAvoidingView>
          </Content>
         </Wallpaper>
        </Container>
      );
    }

    _onReturn = () =>{
        this.props.navigation.navigate('Home')
    }
    error = (s) => {
      Toast.show({
        text: s,
        position: "top",
        type: 'danger',
        buttonText: 'Aceptar'
      });
    }
    async _onSubmit (){
        let submitActive = true
        let {first_name, last_name, document, mobile_number} = this.state;
        if(!first_name){
          this.error('Debes completar tu nombre')
          return
        }
        if(!last_name){
          if(this.state.user.last_name){
            this.error('Debes completar tu apellido')
            return
          }
        }
        if(!document){
          if(this.state.user.document){
            this.error('Debes completar el documento')
            return
          }
        } else{
          if(document.length < 8){
            this.error('El documento debe ser de al menos 8 digitos')
            return
          }
        }

        if(!mobile_number){
          if(this.state.user.mobile_number){
            this.error('Debes completar tu número de teléfono')
            return
          }
        }
        if(!first_name||!last_name||!document||!mobile_number){
            this.error('Debes completar todos los datos')
            return
        }
        document = parseInt(document)
        const userResponse = await this.api.editUser({first_name, last_name, document, mobile_number}).catch(e=>{
          console.log(e);
        });

        if(userResponse && userResponse.success){
 
          Toast.show({
            text: 'Tu perfil se editó correctamente',
            type: 'success',
            buttonText: 'Aceptar'
          });
          submitActive = false
          this.setState({submitActive})
          UsersActions.update();
          const stopListen = UsersActions.me.listen(()=>{
                stopListen()
                this.props.navigation.navigate('Home')
            }
            )
          
        } else{
          submitActive = true
          this.setState({submitActive})
          if(userResponse.data && userResponse.data.user && userResponse.data.user.document){
            Toast.show({
              text: 'Número de documento inválido o repetido',
              position: "top",
              type: 'danger',
              buttonText: 'Aceptar'
            });
            return;
          }
          Toast.show({
            text: 'No se pudo editar el usuario. Por favor, intenta nuevamente',
            position: "top",
            type: 'danger',
            buttonText: 'Aceptar'
          });
        }
        

    };
  }


  export default connectStyle('SuperLiga.ContactScreen')(EditProfileScreen);