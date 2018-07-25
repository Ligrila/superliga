import React from 'react';
import { Platform, StatusBar, StyleSheet, Image } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { Root } from "native-base";

import { StyleProvider } from 'native-base';

import SocketClient from './modules/SocketClient';

import Api from './api/Api';

import AppTheme from './Theme';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    isConnected: false
  };
  api = new Api;
  socket = null;
  async initNetwork(){
      console.ignoredYellowBox = [
        'Setting a timer'
      ];
      this.socket = new SocketClient;
        //this.socket.connect("userDataUpdated",this.onNewUser);
  }
  componentDidMount() {
    this.initNetwork();
  }
  onNewUser(payload){
    console.log("new user");
    console.log(payload);
  }
  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
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
    teams.data.map(team=>{
      teamImages.push(team.avatar);
    });
    const serverAssets = this.cacheImages(teamImages);
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      ...serverAssets,
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
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
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
