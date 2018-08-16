import React from 'react';
import {  StyleSheet, Image,AsyncStorage } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { Root,  Text, Button, Container, Content } from "native-base";

import { StyleProvider } from 'native-base';

import SocketClient from './modules/SocketClient';

import Api from './api/Api';

import AppTheme from './Theme';
import { UsersActions } from './store/UserStore';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    isConnected: false,
    isLoadingError: false
  };
  api = new Api;
  socket = null;
  async initNetwork(){
      /*console.ignoredYellowBox = [
        'Setting a timer'
      ];*/
      this.socket = new SocketClient;
      const token = await AsyncStorage.getItem('token');
      if(token){
        UsersActions.update();
      }
  }

  componentDidMount() {
    this.initNetwork();
  }

  componentWillUmount(){
    this.socket.close();    
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      if(this.state.isLoadingError){
        /*return (
          <Container>
            <Content>
            <Text>Se produjo un error iniciando la red. Por favor, salga de la aplicación e intente nuevamente cuando estes conectado a internet</Text>
            <Button><Text>Cerrar aplicacion</Text></Button>
            </Content>
          </Container>
        );*/
      }
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Root>
          <StyleProvider style={AppTheme}>
              <AppNavigator />
          </StyleProvider>
        </Root>
      );
    }
  }

  cacheImages(images) {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }

  _loadResourcesAsync = async () => {

    const teams  =await this.api.getTeams();
    const teamImages = [];
    if(teams.data){
      teams.data.map(team=>{
        teamImages.push(team.avatar);
      });
    }

    const serverAssets = this.cacheImages(teamImages);
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
        require('./assets/images/app_logo.png'),
        require('./assets/images/logo.png'),
        require('./assets/images/menu.png'),
        require('./assets/images/awards/bg.png'),
        require('./assets/images/awards/bg2.png'),
        require('./assets/images/game/bg.png'),
        require('./assets/images/login/bg.png'),
        require('./assets/images/result/wrong_bg.png'),
        require('./assets/images/sidebar_bg.png'),
        
         
         
      ]),
      ...serverAssets,
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'Roboto': require("native-base/Fonts/Roboto.ttf"),
        'Roboto_medium': require("native-base/Fonts/Roboto_medium.ttf"),
        'edosz': require('./assets/fonts/edosz.ttf'),
        'OpenSans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'OpenSans_bold': require('./assets/fonts/OpenSans-Bold.ttf'),
        'OpenSansCondensed_light': require('./assets/fonts/OpenSansCondensed-Light.ttf'),
        'OpenSansCondensed_bold': require('./assets/fonts/OpenSansCondensed-Bold.ttf'),
      }),
    ]);

  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
//    async () => await this.setState({ isLoadingError: true });
    this.setState({ isLoadingError: true });
  };

  _handleFinishLoading = () => {
//    if(this.state.isLoadingError){
      this.setState({ isLoadingComplete: true });
//    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
