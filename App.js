import React from 'react';
import {  AppState, Image,AsyncStorage, NetInfo,Alert } from 'react-native';
import { AppLoading, Asset, Font, Icon, Linking } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { Root,  Text, Button, Container, Content, Toast } from "native-base";

import { StyleProvider, Header } from 'native-base';

import SocketClient from './modules/SocketClient';

import Api from './api/Api';

import AppTheme from './Theme';
import { UsersActions } from './store/UserStore';

import './helpers/RegisterPushNotification';

import {  Notifications, Util, KeepAwake } from 'expo';
import { ConnectionStatusActions } from './store/ConnectionStatusStore';
import { Localization } from 'expo-localization';

import { NavigationActions } from 'react-navigation';
import { LoginScreenActions } from './store/LoginScreenStore';
import { TriviaQuestionActions } from './store/TriviaQuestion';
import { NavigatorActions } from './store/NavigatorStore';

import { YellowBox } from 'react-native';


export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    isConnected: false,
    isLoadingError: false,
    appState: AppState.currentState

  };
  api = new Api;
  socket = null;
  constructor(props){
    super(props)

    //console.ignoredYellowBox = ['Remote debugger'];
    YellowBox.ignoreWarnings([
        'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
    ]);

  }

  
  isLogin = async () => {
    const userToken = await AsyncStorage.getItem('token');
    const tokenExpire = await AsyncStorage.getItem('tokenExpire');

    let timestamp = new Date().getTime();
    let notExpired = tokenExpire > timestamp;
    return (userToken && (tokenExpire !== null && notExpired));
  }

  _handleNotification = (notification) => {
    const isSelected = notification.origin == 'selected'
    if(!notification.data){
      notification.data = {}
    }
    const hasRedirectData = notification.data.navigate || false
    if(isSelected){
      if(hasRedirectData){
        const params = notification.data.params || null
        this.navigate(notification.data.navigate,params)
      }
    } else{
      if(!notification.data.title){
        return;
      }
      Toast.show({
        text: notification.data.title,
        duration: 4000,
      })
    }
  };

  handleNavigatorEvents = () =>{
    this._addLinkingListener();
    
    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.

    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleRedirect = async (event,initialUrl=false) => {
    const isLogin = await this.isLogin();
    let urlToParse = event.url
    if(
      urlToParse.startsWith('www.jugadasuperliga.com') ||
      urlToParse.startsWith('jugadasuperliga.com') ||
      urlToParse.startsWith('exps://www.jugadasuperliga.com') ||
      urlToParse.startsWith('exps://jugadasuperliga.com') ||
      urlToParse.startsWith('https://www.jugadasuperliga.com') ||
      urlToParse.startsWith('https://jugadasuperliga.com') ||
      urlToParse.startsWith('http://www.jugadasuperliga.com') ||
      urlToParse.startsWith('http://jugadasuperliga.com') 
    ){
      urlToParse = urlToParse.replace('exps://www.jugadasuperliga.com/','jugadasuperliga://')
      urlToParse = urlToParse.replace('exps://jugadasuperliga.com/','jugadasuperliga://')
      urlToParse = urlToParse.replace('https://www.jugadasuperliga.com/','jugadasuperliga://')
      urlToParse = urlToParse.replace('https://jugadasuperliga.com/','jugadasuperliga://')
      urlToParse = urlToParse.replace('http://www.jugadasuperliga.com/','jugadasuperliga://')
      urlToParse = urlToParse.replace('http://jugadasuperliga.com/','jugadasuperliga://')
      urlToParse = urlToParse.replace('jugadasuperliga.com/','jugadasuperliga://')
      urlToParse = urlToParse.replace('www.jugadasuperliga.com/','jugadasuperliga://')
    }
    //Alert.alert("URL TO PARSE: " + urlToParse)
    const {path} = Linking.parse(urlToParse);

    if(path){
      const parts = path.split('/')
      //console.log({parts})
      if(parts[0]=='championships' && parts[1]){
        const championshipId = parts[1]
        if(isLogin){
          this.navigate('ChampionshipSubscribe',{championship:{id:championshipId}})
        } else{
          AsyncStorage.setItem('afterLoginChampionshipSubscribe',championshipId);
          AsyncStorage.removeItem('afterLoginChampionshipSubscribeMessage');
          LoginScreenActions.checkForMessages()
        }
      }
    }
    
  };

   _addLinkingListener = async () => {
    const initialUrl = await Linking.getInitialURL();

    this._handleRedirect({url:initialUrl},true)
    Linking.addEventListener('url', this._handleRedirect);

  };

  _removeLinkingListener = () => {
    Linking.removeEventListener('url', this._handleRedirect);
  };
  closeSocket(){
    console.log("App::closeSocket")
    if(!this.socket || !this.socket.client ){
      return;
    }

    if(typeof(this.socket.client.close) == 'function'){
      console.log("Closing socket...")
      this.socket.client.close();
    }

    this.socket = null;
  }
  async initSocket(){
    console.log("Init Socket")
    const token = await AsyncStorage.getItem('token');
    if(this.socket){
      this.closeSocket();
    }
    if(!token){
      console.log("No token")
      return;
    }
    const user = JSON.parse(await AsyncStorage.getItem('user'));

    this.socket = new SocketClient(token,user);
  }

  async initNetwork(){
      /*console.ignoredYellowBox = [
        'Setting a timer'
      ];*/
      //const token = await AsyncStorage.getItem('token');
      //if(token){
        UsersActions.update();
        this.initSocket()
      //}
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
    try{
    AppState.addEventListener('change', this._handleAppStateChange);

    UsersActions.isLoggedIn.listen(
      (b) => {
        //console.log({b});
        if(b){
            this.initSocket()
        } else{
           this.closeSocket();
        }

        registerPushNotifications().then((data)=>console.log('PushNotificationsRegister',data))
        .catch(function(e) {
          //rejected
        });;
      }
    )

    KeepAwake.activate();

    
    this.initNetwork();



    TriviaQuestionActions.onNewQuestion.listen((question)=>{
        // send local push notification is app is in background
        if(this.state.appState.match(/inactive|background/) ){
          //console.log(question);
          const localNotification = {
            title: question.title,
            body: 'Responde ahora la pregunta'
          }
          Notifications.presentLocalNotificationAsync(localNotification);
        }
    })

    Notifications.createCategoryAsync('ChampionshipView', 
    [{
      actionId: 'ChampionshipView',
      buttonTitle: 'Ver',
    }
    ]
    )

    } catch(e){
      console.log("App::componentDidMount",e)
    }
  }

  componentWillUmount(){
    this.socket.close();
    AppState.removeEventListener('change', this._handleAppStateChange);
    
  }

  navigate = (routeName, params) => {
    this.AppNavigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      })
    );
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      //if(!this.socket.connected){
        //this.navigate('HomeSwitcher'); // en test, error solamente llamar si estas en home
      //}
      //console.log('App has come to the foreground!')
    }
    this.setState({appState: nextAppState});
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
              <AppNavigator 
                  ref={
                      (navigatorRef) =>{
                        this.AppNavigator = navigatorRef
                        this.handleNavigatorEvents()
                        NavigatorActions.setNavigator(navigatorRef)
                        //console.log(navigatorRef.dispatch)
                      }
                    }

              />
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
    const deviceTimezone = await Localization.getLocalizationAsync();
    await AsyncStorage.setItem('deviceTimezone', `${deviceTimezone.timezone}`);
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
        'AbadiMTCondensedExtraBold': require('./assets/fonts/AbadiMTCondensedExtraBold.ttf'),
      }),
      Asset.loadAsync([
        require ('./assets/images/home/shop.png'),
        require ('./assets/images/home/help.png'),
        require ('./assets/images/home/home_bg.png'),
        require ('./assets/images/home/share.png'),
        require ('./assets/images/halfTimePlayBg.png'),
        require ('./assets/images/icon.png'),
        require ('./assets/images/home_trivia_bg.png'),
        require ('./assets/images/form/left-arrow.png'),
        require ('./assets/images/form/wallpaper.png'),
        require ('./assets/images/form/username.png'),
        require ('./assets/images/form/loading.gif'),
        require ('./assets/images/form/password.png'),
        require ('./assets/images/form/logo.png'),
        require ('./assets/images/form/eye_black.png'),
        require ('./assets/images/trivia-carousel-minimal-prev.png'),
        require ('./assets/images/ball.png'),
        require ('./assets/images/championship/trophy.png'),
        require ('./assets/images/championship/trophy-created.png'),
        require ('./assets/images/championship/challenge_accept_bg.png'),
        require ('./assets/images/championship/medal.png'),
        require ('./assets/images/championship/bg2.png'),
        require ('./assets/images/championship/trophy-avatar.png'),
        require ('./assets/images/championship/bg.png'),
        require ('./assets/images/result/wrong_bg.png'),
        require ('./assets/images/trivia-carousel-minimal-next.png'),
        require ('./assets/images/purchase-modal.png'),
        require ('./assets/images/whistle.png'),
        require ('./assets/images/ball_old.png'),
        require ('./assets/images/bgOld.png'),
        require ('./assets/images/blackBg.png'),
        require ('./assets/images/robot-prod.png'),
        require ('./assets/images/contactBg.png'),
        require ('./assets/images/icon_ios.png'),
        require ('./assets/images/game/bgOld.png'),
        require ('./assets/images/game/genericQuestionBg.png'),
        require ('./assets/images/game/bg2.png'),
        require ('./assets/images/game/bg.png'),
        require ('./assets/images/asplash.png'),
        require ('./assets/images/robot-dev.png'),
        require ('./assets/images/nextArrow.png'),
        require ('./assets/images/splash.png'),
        require ('./assets/images/extraPlayBg.png'),
        require ('./assets/images/menu.png'),
        require ('./assets/images/whistle2.png'),
        require ('./assets/images/sidebar_bg.png'),
        require ('./assets/images/carousel-next.png'),
        require ('./assets/images/home_bg.png'),
        require ('./assets/images/logo.png'),
        require ('./assets/images/carousel-prev.png'),
        require ('./assets/images/share.png'),
        require ('./assets/images/teams/colon.png'),
        require ('./assets/images/teams/patronato.png'),
        require ('./assets/images/programmed-trivia-bg.png'),
        require ('./assets/images/awards/bg2.png'),
        require ('./assets/images/awards/bg.png'),
        require ('./assets/images/app_logo.png'),
        require ('./assets/images/rain_back.png'),
        require ('./assets/images/home_bg_demo.png'),
        require ('./assets/images/tutorial1.png'),
        require ('./assets/images/login/bg.png'),
        require ('./assets/images/noticeBg.png'),
        require ('./assets/images/tutorial2.png'),
        require ('./assets/images/rain.png'),
        require ('./assets/images/tutorial3.png'),
        require ('./assets/images/bg.png'),
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


