import React from 'react';
import Reflux from 'reflux';
import { View,TouchableOpacity } from 'react-native'

import {connectStyle,Header,Container,Content,Text, Icon, Toast} from 'native-base';

import { ImagePicker } from 'expo';


import Wallpaper from '../components/Wallpaper';
import { UsersStore } from '../store/UserStore';

import bgSrc from '../assets/images/sidebar_bg.png';
import UserAvatar from '../components/UserAvatar';
import Api from '../api/Api';

class ProfileScreen extends Reflux.Component {
  api = new Api;
  static navigationOptions = {
    title: 'Mi perfil',
  };

  constructor(props){
    super(props);
    this.store = UsersStore;
  }

  render() {
    if(!this.state.hasInformation){
      return <View />;
    }
    let lives = points = 0;
    if(this.state.user.life[0]){
      lives = this.state.user.life[0].lives;
    }
    if(this.state.user.points[0]){
        points = this.state.user.points[0].points;
    }
    const styles = this.props.style;
    return (
      <Container>
      <Header transparent />
      <Wallpaper source={bgSrc}>
        <Content padder contentContainerStyle={styles.profile}>
          <View style={styles.profileContainer}>
              <Text>MI PERFIL</Text>
              <UserAvatar avatar={this.state.user.avatar} />
              <Text>{(this.state.user.first_name + " " + this.state.user.last_name).toUpperCase()}</Text>
              <Text>
                <Text style={styles.bold}>Puntos:</Text> {points} {"\n"}
                <Text style={styles.bold}>Vidas:</Text> {lives} {"\n"}
                <Text style={styles.bold}>Partidos jugados:</Text> x {"\n"}
              </Text>

              <TouchableOpacity 
                  onPress={this._pickImage}
              >
                  <Text> editar imagen de perfil{"\n"}
                  <Icon type="Entypo" name="chevron-right"></Icon>
                  </Text>
              </TouchableOpacity>
          </View>
        </Content>
       </Wallpaper>
      </Container>
    );
  }

  _pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });

      console.log(result);

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