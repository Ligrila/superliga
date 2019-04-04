import React from 'react';
import {View,ImageBackground,TouchableOpacity} from 'react-native'
import Reflux from 'reflux'
import {connectStyle,Container, Content ,  Button , Text,Toast } from 'native-base'
import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';

import bgSrc from '../assets/images/championship/bg2.png';
import Loader from '../components/Loader';


import { ChallengeRequestStore, ChallengeRequestActions } from '../store/ChallengeRequestStore';


const challengeAcceptBg = require('../assets/images/championship/challenge_accept_bg.png')



class ChallengeRequestScreen extends Reflux.Component {
  challengeRequest = {
    isOnline: false,
    id: null
  }
  championship = {
    isOnline:false,
    name: ''
  }
  challengeChampionship={
    name: ''
  }

  constructor(props){
    super(props);
    this.challengeRequest = this.props.navigation.getParam('challengeRequest', this.challengeRequest);
    this.championship = this.props.navigation.getParam('championship', this.championship);
    this.challengeChampionship = this.props.navigation.getParam('challengeChampionship', this.challengeChampionship);
    this.store = ChallengeRequestStore

  }
  async componentDidMount(){

    ChallengeRequestActions.response.listen((response)=>{
      if(response.success){
        Toast.show({
          text: 'Desafio aceptado',
          type: 'success',

        });
      } else{
        Toast.show({
          text: 'Ocurrió un erro al intentar guardar el desafio',
          type: 'danger',
        });
      }
      
    })
  }


  accept = () =>{
    ChallengeRequestActions.save(this.challengeRequest.id,true)
  }
  reject = () => {
    ChallengeRequestActions.save(this.challengeRequest.id,false)
  }

  onHide = ()=>{
    this.props.navigation.navigate('Notification');
  }
  renderHide(){

    const styles = this.props.style;
    return(
        <View style={styles.close}>
        <TouchableOpacity
        style={styles.closeTouchable}
        onPress={this.onHide}
        >
            <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
        </View>
    )
  }
  renderButtons(){
    const styles = this.props.style
    if(this.challengeRequest.done){
      const acceptedText = this.challengeRequest.accepted ? 'aceptado' : 'rechazado';
      <View style={styles.buttonContainer}>
        <Text>Ya has {acceptedText} el desafio</Text>
      </View>
    }

    return (
      <View style={styles.buttonContainer}>
        <Button info onPress={this.accept}><Text style={styles.buttonText}>Aceptar</Text></Button>
        <Button onPress={this.reject} style={styles.lastButton} danger><Text style={styles.buttonText}>Rechazar</Text></Button>
      </View>
    )
  }
  renderMessage(){
    const styles = this.props.style;    
    return(
    <ImageBackground source={challengeAcceptBg} style={styles.bg}>
      {this.renderHide()}
      <View style={styles.messageContainer}>
          <Text style={styles.title}>DESAFÍO</Text>
          <Text  style={styles.text}>{this.challengeChampionship.name.trim().toUpperCase()} QUIERE DESAFIAR A TU EQUIPO {this.championship.name.trim().toUpperCase()} POR UNA SEMANA</Text>
          {this.renderButtons()}
      </View>
    </ImageBackground>
    )
  }
  render() {
    const styles = this.props.style;
    return (
      <Container>
        <Wallpaper source={bgSrc}>
        <AppHeader drawerOpen={() => {this.props.navigation.openDrawer()}} />
        <Content contentContainerStyle={styles.content} padder>
          <Loader loading={this.state.ChallengeRequest.loading} />
            {this.renderMessage()}
        </Content>
        </Wallpaper>
      </Container>
    );
  }
}

export default connectStyle('SuperLiga.ChallengeRequestScreen')(ChallengeRequestScreen);