import React from 'react';
import Reflux from 'reflux';
import { View,TouchableOpacity } from 'react-native'
import {Permissions} from 'expo'

import {connectStyle,Header,Container,Content,Text, Icon, Toast, Button, ActionSheet} from 'native-base';

import { ImagePicker } from 'expo';

import Wallpaper from '../components/Wallpaper';
import { UsersStore } from '../store/UserStore';

import sidebarBgSrc from '../assets/images/sidebar_bg.png';
import bgSrc from '../assets/images/bg.png';
import UserAvatar from '../components/UserAvatar';
import Api from '../api/Api';
import AppHeader from '../components/AppHeader/AppHeader';

class ProfileScreen extends Reflux.Component {
  api = new Api;
  static navigationOptions = {
    title: 'Mi perfil',
  };

  constructor(props){
    super(props);
    this.store = UsersStore;
  }
  closeSession = () => {
    this.props.navigation.navigate('Logout');
  }
  render() {
    if(!this.state.hasInformation){
      return <View />;
    }

    let lives = points = playedGames = 0;
    if(this.state.user.life){
      lives = this.state.user.life.lives;
    }
    if(this.state.user.infinite_lives && this.state.user.infinite_lives[0]){
      lives = '∞';
    }
    if(this.state.user.point){
        points = this.state.user.point.points;
    }
    if(this.state.user.played_game){
      playedGames = this.state.user.played_game.count;
    }
    const styles = this.props.style;
    return (
      <Container>
      <Wallpaper source={bgSrc}>
      <AppHeader drawerOpen={() => {this.props.navigation.openDrawer()}} game={false} style={styles.header} />
        <Content contentContainerStyle={styles.profile}>
          <Wallpaper source={sidebarBgSrc} style={styles.profileWallpaper}>
          <View style={styles.profileContainer}>
              <Text>MI PERFIL</Text>
              <UserAvatar avatar={this.state.user.avatar} />
              <Text>{(this.state.user.first_name + " " + this.state.user.last_name).toUpperCase()}</Text>
              <Text>
                <Text style={styles.bold}>Puntos:</Text> {points} {"\n"}
                <Text style={styles.bold}>Vidas:</Text> {lives} {"\n"}
                <Text style={styles.bold}>Partidos jugados:</Text> {playedGames} {"\n"}
              </Text>

              <TouchableOpacity 
                  onPress={this._actionSheet}
                  style={styles.changeAvatarButton}
                >
                  <Text> editar imagen de perfil
                  </Text>
                  <Icon style={styles.icon} type="Entypo" name="chevron-right"></Icon>
              </TouchableOpacity>
              <Button light block onPress={this.closeSession}><Text>Cerrar sesión</Text></Button>
          </View>
          </Wallpaper>
        </Content>
        </Wallpaper>
      </Container>
    );
  }

  _actionSheet = ()=>{
    const BUTTONS = ["Seleccionar de galeria", "Tomar foto", "Cancelar"];

    const CANCEL_INDEX = 2
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        title: "Editar imagen de perfil"
      },
      buttonIndex => {
        if(buttonIndex==0){
          this._pickImage();
        }
        if(buttonIndex==1){
          this._takePhoto();
        }
      }
    )
  }

  _checkPermissions = async ()=>{

  return await Promise.all([
    Permissions.askAsync(Permissions.CAMERA),
    Permissions.askAsync(Permissions.CAMERA_ROLL),
  ])
    .then(r => r.filter(o => o.status === 'granted'))
    .then(permissions => {
      if (permissions.length !== 2) {
        return false;
      }
      return true;
    });
  }

  _takePhoto = async () => {
    
    const c = await this._checkPermissions();
    if(!c){
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });


    if (!result.cancelled) {
      this.setState({ image: result.uri });
      const response = await this.api.changeAvatar(result.uri);
      if(response.success){
        let user = this.state.user;
        user.avatar = result.uri;
        this.setState(user);
      } else{
        Toast.show({
          text: 'No se pudo cambiar tu imagen de perfil. Por favor, intenta nuevamente',
          buttonText: 'Aceptar'
        });
      }
    }
  }
  _pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });


      if (!result.cancelled) {
        this.setState({ image: result.uri });
        const response = await this.api.changeAvatar(result.uri);
        if(response.success){
          let user = this.state.user;
          user.avatar = result.uri;
          this.setState(user);
        } else{
          Toast.show({
            text: 'No se pudo cambiar tu imagen de perfil. Por favor, intenta nuevamente',
            buttonText: 'Aceptar'
          });
        }
      }
    }
}

export default connectStyle('SuperLiga.ProfileScreen')(ProfileScreen);