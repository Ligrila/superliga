import React from 'react';
import {  StyleSheet, Image,AsyncStorage, NetInfo } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { Root,  Text, Button, Container, Content, Toast } from "native-base";

import { StyleProvider, Header } from 'native-base';

import SocketClient from './modules/SocketClient';

import Api from './api/Api';

import AppTheme from './Theme';
import { UsersActions } from './store/UserStore';

import './helpers/RegisterPushNotification';

import { DangerZone, Notifications, Util, KeepAwake } from 'expo';
import { ConnectionStatusActions } from './store/ConnectionStatusStore';
const { Localization } = DangerZone;


export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    isConnected: false,
    isLoadingError: false
  };
  api = new Api;
  socket = null;
  constructor(props){
    super(props)
  }
  async initNetwork(){
      /*console.ignoredYellowBox = [
        'Setting a timer'
      ];*/
      this.socket = new SocketClient;
      const token = await AsyncStorage.getItem('token');
      if(token){
        UsersActions.update();
      }
      NetInfo.getConnectionInfo().then((connectionInfo) => {
        handleConnectivityChange(connectionInfo);
      });
      handleConnectivityChange = (connectionInfo) => {
        if(connectionInfo.type=='none'){
          ConnectionStatusActions.set(false);
        }
      }
      NetInfo.addEventListener(
        'connectionChange',
        handleConnectivityChange
      );
  }

  componentDidMount() {
    UsersActions.isLoggedIn.listen(
      (b) => {
        registerPushNotifications().then((data)=>console.log('PushNotificationsRegister',data));
      }
    )

    KeepAwake.activate();

    
    this.initNetwork();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.

    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }
  _handleNotification = (notification) => {
    console.log("NOTIFICATION", notification);
  };
  componentWillUmount(){
    this.socket.close();    
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      if(this.state.isLoadingError){
        return (
          <Container>
            <Header />
            <Content>
            <Text>Se produjo un error iniciando la red. Por favor, salga de la aplicación e intente nuevamente cuando estes conectado a internet</Text>
            <Button onPress={Util.reload}><Text>Cerrar aplicacion</Text></Button>
            </Content>
          </Container>
        );
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
    const deviceTimezone = await Localization.getCurrentTimeZoneAsync();
    await AsyncStorage.setItem('deviceTimezone', `${deviceTimezone}`);
    return Promise.all([
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
      Asset.loadAsync([
        require ('./assets/images/noticeBg.png'),
        require ('./assets/images/sidebar_bg.png'),
        require ('./assets/images/login/bg.png'),
        require ('./assets/images/game/bg.png'),
        require ('./assets/images/game/bg2.png'),
        require ('./assets/images/bg.png'),
        require ('./assets/images/home/help.png'),
        require ('./assets/images/home/shop.png'),
        require ('./assets/images/home/share.png'),

        require ('./assets/images/game/genericQuestionBg.png'),      
        require ('./assets/images/extraPlayBg.png'),        
        require ('./assets/images/halfTimePlayBg.png'),     
        require ('./assets/images/programmed-trivia-bg.png'),        
   

        
        require ('./assets/images/teams/colon.png'),
        require ('./assets/images/teams/patronato.png'),
        require ('./assets/images/ball.png'),
        require ('./assets/images/home_bg.png'),
        require ('./assets/images/carousel-prev.png'),
        require ('./assets/images/rain_back.png'),
        require ('./assets/images/result/wrong_bg.png'),
        require ('./assets/images/icon.png'),
        require ('./assets/images/tutorial.png'),

        require ('./assets/images/whistle.png'),
        require ('./assets/images/nextArrow.png'),
        require ('./assets/images/menu/fixture.png'),
        require ('./assets/images/menu/buy.png'),
        require ('./assets/images/menu/settings.png'),
        require ('./assets/images/menu/statistics.png'),
        require ('./assets/images/menu/awards.png'),
        require ('./assets/images/menu/rewards.png'),
        require ('./assets/images/menu/profile.png'),
        require ('./assets/images/splash.png'),
        require ('./assets/images/rain.png'),
        require ('./assets/images/robot-dev.png'),
        require ('./assets/images/purchase-modal.png'),
        require ('./assets/images/awards/bg.png'),
        require ('./assets/images/awards/bg2.png'),
        require ('./assets/images/carousel-next.png'),
        require ('./assets/images/app_logo.png'),
        require ('./assets/images/menu.png'),
        require ('./assets/images/logo.png'),
        require ('./assets/images/form/wallpaper.png'),
        require ('./assets/images/form/username.png'),
        require ('./assets/images/form/left-arrow.png'),
        require ('./assets/images/form/loading.gif'),
        require ('./assets/images/form/eye_black.png'),
        require ('./assets/images/form/logo.png'),
        require ('./assets/images/form/password.png'),
        require ('./assets/images/robot-prod.png'),      
      ]),
      ...serverAssets,
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


