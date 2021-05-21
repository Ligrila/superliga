import React, { useCallback, useEffect, useState, } from "react";
import { BackHandler, StatusBar } from "react-native";
// React Native
import { AppState, Image } from "react-native";
// Async Storage
import AsyncStorage from "@react-native-async-storage/async-storage";
// Loading
import AppLoading from "expo-app-loading";
// Notifications
import * as Notifications from "expo-notifications";
// Updates
import * as Updates from "expo-updates";
// Localization
import * as Localization from "expo-localization";
// Expo Keep Awake
import { activateKeepAwake } from "expo-keep-awake";
// App Navigator
import Navigation from "./new-navigation";
// import { NavigationActions } from "react-navigation";
// Api
import Api from "./api/Api";
// Theme
import AppTheme from "./Theme";
// Native Base
import { Root, Text, Button, Container, Content, Header, StyleProvider } from "native-base";
// Assets
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
// Helper
import "./helpers/RegisterPushNotification";
// Store
import { UsersActions } from "./store/UserStore";
import { ConnectionStatusActions } from "./store/ConnectionStatusStore";
import { LoginScreenActions } from "./store/LoginScreenStore"
import { TriviaQuestionActions } from "./store/TriviaQuestion";
import { NavigatorActions } from "./store/NavigatorStore";

import { YellowBox } from "react-native";
// Recoil
import { RecoilExternalStatePortal } from "./components/Recoil/RecoilExternalStatePortal";
import {
  RecoilRoot
} from 'recoil';
import NavigationListen from "./components/NavigationListen/NavigationListen";
import DebugObserver from "./components/Debug/DebugObserver";

// Ads
import { setTestDeviceIDAsync } from "expo-ads-admob";
import WatchCurrentTrivia from "./components/WatchCurrenTrivia/WatchCurrentTrivia";
import SocketContextProvider from "./components/Socket/SocketContextProvider";
import RegisterPushNotifications from "./components/PushNotifications/RegisterPushNotifications";
import AppStateWatch from "./components/AppState/AppStateWatch";
import LinkingWatch from "./components/Linking/LinkingWatch";






// Notifications Configuration
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App: React.FC = () => {
  // Api
  const api = new Api();
  let socket: any = null;
  // States
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  // const [isConnected, setIsConnected] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  // const [appState, setAppState] = useState(AppState.currentState);
  // Handle On Reload
  const handleOnReload = () => {
    BackHandler.exitApp();
  };
  // Cache Images
  const cacheImages = (images) => {
    return images.map((image) => {
      if (typeof image === "string") {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  };
  // Load Resousrce Async
  const loadResourcesAsync = useCallback(async () => {
    // Adds
    await setTestDeviceIDAsync('EMULATOR');
    const teams = await api.getTeams();
    const teamImages: any = [];
    if (teams) {
      if (teams.data) {
        teams.data.map((team: any) => {
          teamImages.push(team.avatar);
        });
      }
    }
    const serverAssets = cacheImages(teamImages);

    const deviceTimezone = await Localization.getLocalizationAsync();

    await AsyncStorage.setItem("deviceTimezone", `${deviceTimezone.timezone}`);

    return Promise.all([
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        edosz: require("./assets/fonts/edosz.ttf"),
        OpenSans: require("./assets/fonts/OpenSans-Regular.ttf"),
        OpenSans_bold: require("./assets/fonts/OpenSans-Bold.ttf"),
        OpenSansCondensed_light: require("./assets/fonts/OpenSansCondensed-Light.ttf"),
        OpenSansCondensed_bold: require("./assets/fonts/OpenSansCondensed-Bold.ttf"),
        AbadiMTCondensedExtraBold: require("./assets/fonts/AbadiMTCondensedExtraBold.ttf"),
      }),
      Asset.loadAsync([
        require("./assets/images/blackBg.orig.png"),
        require("./assets/images/home/shop.png"),
        require("./assets/images/home/share.orig.png"),
        require("./assets/images/home/help.orig.png"),
        require("./assets/images/home/help.png"),
        require("./assets/images/home/home_bg.png"),
        require("./assets/images/home/share.png"),
        require("./assets/images/home/shop.orig.png"),
        require("./assets/images/halfTimePlayBg.png"),
        require("./assets/images/icon.orig.png"),
        require("./assets/images/icon_ios.orig.png"),
        require("./assets/images/icon.png"),
        require("./assets/images/tutorial1.orig.png"),
        require("./assets/images/flag.png"),
        require("./assets/images/home_trivia_bg.png"),
        require("./assets/images/form/left-arrow.png"),
        require("./assets/images/form/wallpaper.png"),
        require("./assets/images/form/username.png"),
        require("./assets/images/form/loading.gif"),
        require("./assets/images/form/logo.orig.png"),
        require("./assets/images/form/password.png"),
        require("./assets/images/form/logo.png"),
        require("./assets/images/form/eye_black.png"),
        require("./assets/images/result/wrong_bg.png"),
        require("./assets/images/robot-prod.orig.png"),
        require("./assets/images/purchase-modal.png"),
        require("./assets/images/whistle.png"),

        require("./assets/images/bgOld.png"),
        require("./assets/images/purchase-modal.orig.png"),
        require("./assets/images/blackBg.png"),
        require("./assets/images/noticeBg.orig.png"),
        require("./assets/images/chat-bg.png"),
        require("./assets/images/robot-prod.png"),
        require("./assets/images/contactBg.png"),
        require("./assets/images/icon_ios.png"),
        require("./assets/images/flag.orig.png"),
        require("./assets/images/asplash.png"),
        require("./assets/images/logo.orig.png"),
        require("./assets/images/robot-dev.png"),
        require("./assets/images/nextArrow.png"),
        require("./assets/images/share.orig.png"),
        require("./assets/images/splash.png"),
        require("./assets/images/extraPlayBg.png"),
        require("./assets/images/menu.png"),
        require("./assets/images/whistle2.png"),
        require("./assets/images/home_bg.png"),
        require("./assets/images/logo.png"),
        require("./assets/images/tutorial2.orig.png"),
        require("./assets/images/tutorial3.orig.png"),
        require("./assets/images/rain_back.orig.png"),
        require("./assets/images/share.png"),
        require("./assets/images/teams/colon.orig.png"),
        require("./assets/images/teams/colon.png"),
        require("./assets/images/teams/patronato.png"),
        require("./assets/images/teams/patronato.orig.png"), ,
        require("./assets/images/programmed-trivia-bg.png"),
        require("./assets/images/robot-dev.orig.png"),
        require("./assets/images/awards/bg2.png"),
        require("./assets/images/awards/bg.png"),
        require("./assets/images/app_logo.png"),
        require("./assets/images/rain_back.png"),
        require("./assets/images/home_bg_demo.png"),
        require("./assets/images/whistle.orig.png"),
        require("./assets/images/asplash.orig.png"),
        require("./assets/images/programmed-trivia-bg.orig.png"),
        require("./assets/images/extraPlayBg.orig.png"),
        require("./assets/images/nextArrow.orig.png"),
        require("./assets/images/tutorial1.png"),
        require("./assets/images/contactBg.orig.png"),
        require("./assets/images/whistle2.orig.png"),
        require("./assets/images/rain.orig.png"),
        require("./assets/images/login/bg.png"),
        require("./assets/images/noticeBg.png"),
        require("./assets/images/tutorial2.png"),
        require("./assets/images/menu.orig.png"),
        require("./assets/images/rain.png"),
        require("./assets/images/tutorial3.png"),
        require("./assets/images/bg.png"),
        // Menu
        require("./assets/images/menu/menu_awards.png"),
        require("./assets/images/menu/menu_buys.png"),
        require("./assets/images/menu/menu_fixture.png"),
        require("./assets/images/menu/menu_goals.png"),
        require("./assets/images/menu/menu_profile.png"),
        require("./assets/images/menu/menu_settings.png"),
        require("./assets/images/menu/menu_statistics.png"),
        require("./assets/images/menu/menu_home.png"),
        // Logo
        require("./assets/images/app_logo.orig.png"),
        require("./assets/images/app_logo.png"),
        // Blue Bg
        require("./assets/images/bg-blue.png"),
        // Championship
        require("./assets/images/championship/trophy.png"),
        require("./assets/images/championship/trophy-created.png"),
        require("./assets/images/championship/challenge_accept_bg.png"),
        require("./assets/images/championship/trophy.orig.png"),
        require("./assets/images/championship/medal.orig.png"),
        require("./assets/images/championship/trophy-created.orig.png"),
        require("./assets/images/championship/medal.png"),
        require("./assets/images/championship/bg2.png"),
        require("./assets/images/championship/trophy-avatar.png"),
        require("./assets/images/championship/challenge_accept_bg.orig.png"),
        require("./assets/images/championship/bg_champion.png"),
        // Carousel
        require("./assets/images/carousel_navigation_bg.png"),
        require("./assets/images/carousel_navigation_invested_bg.png"),
        // Game
        require("./assets/images/game/genericQuestionBg.png"),
        require("./assets/images/game/bg.png"),
        require("./assets/images/game/game_bg.png"),
        // Ball
        require("./assets/images/ball.png"),
        require("./assets/images/ball_min.png"),
        // Challenge
      ]),
      ...serverAssets,
    ]);

  }, [Font]);

  // Bootstrap Async
  const bootstrapAsync = useCallback(async () => {
    try {
      await loadResourcesAsync();
      // await initSocket();
    } catch (e) {
      // console.log(`bootstrapAsync`, e);
      setIsLoadingError(true);
    } finally {
      setIsLoadingComplete(true);
    }
  }, [loadResourcesAsync]);
  // Change Auth User Init Socket

  // Mount
  useEffect(() => {
    // Init All Async
    bootstrapAsync();
    return () => {

    };
  }, [bootstrapAsync]);

  if (!isLoadingComplete) {
    return <AppLoading />;
  }
  if (isLoadingError) {
    return (
      <Root>
        <StyleProvider style={AppTheme}>
          <Container>
            <Header style={{ backgroundColor: 'red' }} />
            <Content
              padder
              contentContainerStyle={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#000', }}>
                Se produjo un error iniciando la red. Por favor, salga de la
                aplicación e intente nuevamente cuando estes conectado a
                internet
              </Text>
              <Button onPress={handleOnReload}>
                <Text>Cerrar aplicacion</Text>
              </Button>
            </Content>
          </Container>
        </StyleProvider>
      </Root>
    );
  }
  return (
    <Root>
      <StatusBar hidden={true} />
      <StyleProvider style={AppTheme}>
        <RecoilRoot>
          {/*
            @TODO ask lean  
            Init Socket and provide only when haver user in recoil store */}
          <SocketContextProvider>
            {/* Linking Watch */}
            <LinkingWatch />
            {/* App State */}
            <AppStateWatch />
            {/* Register Push Notifications */}
            <RegisterPushNotifications />
            {/* Recoil Debug Observer */}
            {/* <DebugObserver/>  */}
            {/* Current Trivia Listen */}
            <WatchCurrentTrivia />
            {/* To access recoil outside of component */}
            <RecoilExternalStatePortal />
            
            <Navigation isLoggedIn={false} />
          </SocketContextProvider>
        </RecoilRoot>
      </StyleProvider>
    </Root>
  );

};

export default App;