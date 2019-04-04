import React from 'react';
import Reflux from 'reflux'
import {
    View,
    StyleSheet,
    AsyncStorage
  } from 'react-native';


import {connectStyle,Header,Container,Content,Button,Form, Item, Picker,Text,Icon,Toast,Textarea} from 'native-base';
import Expo from 'expo';

import Wallpaper from '../components/Wallpaper';
const bgSrc = require('../assets/images/contactBg.png');

import Api from '../api/Api';
import AppHeader from '../components/AppHeader/AppHeader';
import { ContactStore, ContactActions } from '../store/ContactStore';


class ContactScreen extends Reflux.Component {
    static navigationOptions = {
      title: 'Contact',
    };
    api = new Api;
    state = {
      submitActive : true,
      contact_topic_id: null,
      body: null,

    }
    constructor(props) {
      super(props);
      this._onSubmit = this._onSubmit.bind(this);
      this.store = ContactStore
    }

    onTopicChange = async (contact_topic_id)=>{
      await  this.setState({contact_topic_id});

    }
    onBodyChange = async (body)=>{
      await  this.setState({body});

    }

    componentDidMount(){
        ContactActions.topics()
    }

     renderTopics(){
         if(!this.state.Contact.hasData) return null
         console.log(this.state.Contact)
         return this.state.Contact.data.map(
             (topic) => {
                    return (<Picker.Item  color='#fff' label={topic.name} value={topic.id} />)
                 }
         )
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
            <Button rounded block large onPress={this._onReturn} style={styles.submitButton}>
                  <Text style={styles.submitButtonText}>Regresar</Text>
            </Button>
        )
             
     }
     renderPicker(){
        const styles = this.props.style;



        
        return (
            <Picker 
                      placeholder="Tema a consultar"
                      iosHeader="Seleccionar"
                      Header="Seleccionar"
                      placeholderStyle={styles.placeholder}
                      iosIcon={<Icon style={{color:'#fff'}} name="ios-arrow-down" />}
                      style={styles.input} 
                      
                      textStyle={styles.pickerText}
                      itemTextStyle={styles.pickerItemText}


                      selectedValue={this.state.contact_topic_id}
                      onValueChange={this.onTopicChange}
                    >
                    {this.renderTopics()}
            </Picker>
        )

    }
    render() {
      const styles = this.props.style;
      return (
        <Container>
        <Wallpaper source={bgSrc}>
          <AppHeader drawerOpen={() => {this.props.navigation.openDrawer()}} />
          <Content contentContainerStyle={styles.content}>
            <View style={styles.container}>
                <Text style={styles.title}>Por favor, completa el{"\n"} formulario, en breve nos{"\n"} comunicamos con vos:</Text>
                <Form style={styles.form}>
                <Item style={styles.item} picker>
                    {this.renderPicker()}
                  </Item>
                  <Item style={styles.item}>
                    <Textarea style={styles.input} placeholder="Tus comentarios"
                      onChangeText={this.onBodyChange}
                      placeholderTextColor='#fff'
                    />
                  </Item>

                </Form>

                {this.renderSubmit()}


              </View>
          </Content>
         </Wallpaper>
        </Container>
      );
    }

    _onReturn = () =>{
        this.props.navigation.navigate('Home')
    }
    async _onSubmit (){
        let {contact_topic_id, body} = this.state;
        if(!contact_topic_id){
            Toast.show({
                text: 'Debes seleccionar un tema',
                position: "top",
                type: 'danger',
                buttonText: 'Aceptar'
              });
            return
        }
        if(!body){
            Toast.show({
                text: 'Debes seleccionar un escribir un mensaje',
                position: "top",
                type: 'danger',
                buttonText: 'Aceptar'
              });
            return
        }
        var contactResponse = await this.api.contact(contact_topic_id,body).catch(e=>{
          console.log(e);
        });

        
        if(contactResponse && contactResponse.success){
 
          Toast.show({
            text: 'Tu contacto se ha enviado correctamente',
            type: 'success',
            buttonText: 'Aceptar'
          });
          const submitActive = false
          this.setState({submitActive})
        } else{
          Toast.show({
            text: 'No se pudo enviar el formulario. Por favor, intenta nuevamente',
            position: "top",
            type: 'danger',
            buttonText: 'Aceptar'
          });
        }
        

    };
  }


  export default connectStyle('SuperLiga.ContactScreen')(ContactScreen);