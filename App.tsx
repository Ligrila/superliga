import React, { useCallback, useEffect, useState } from "react";
import { BackHandler } from "react-native";
// React Native
import { AppState, Image } from "react-native";
// Async Storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Loading
import AppLoading from "expo-app-loading";
// Linking
import * as Linking from "expo-linking";
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
// Socket
import SocketClient from "./modules/SocketClient";
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
// Recoil
import {
  RecoilRoot
} from 'recoil';
// Store
import { UsersActions } from "./store/UserStore";
import { ConnectionStatusActions } from "./store/ConnectionStatusStore";
import { LoginScreenActions } from "./store/LoginScreenStore"
import { TriviaQuestionActions } from "./store/TriviaQuestion";
import { NavigatorActions } from "./store/NavigatorStore";

import { YellowBox } from "react-native";

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
  const socket = null;
  // States
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);

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
  // Load assets
  const loadResourcesAsync = useCallback(async () => {
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
        require("./assets/images/carousel-prev.orig.png"),
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
        require("./assets/images/trivia-carousel-minimal-prev.png"),
        require("./assets/images/ball.png"),
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
        require("./assets/images/championship/bg.png"),
        require("./assets/images/result/wrong_bg.png"),
        require("./assets/images/robot-prod.orig.png"),
        require("./assets/images/sidebar_bg.orig.png"),
        require("./assets/images/trivia-carousel-minimal-next.png"),
        require("./assets/images/purchase-modal.png"),
        require("./assets/images/whistle.png"),
        require("./assets/images/ball_old.png"),
        require("./assets/images/trivia-carousel-minimal-prev.orig.png"),
        require("./assets/images/trivia-carousel-minimal-next.orig.png"),
        require("./assets/images/bgOld.png"),
        require("./assets/images/purchase-modal.orig.png"),
        require("./assets/images/blackBg.png"),
        require("./assets/images/noticeBg.orig.png"),
        require("./assets/images/chat-bg.png"),
        require("./assets/images/robot-prod.png"),
        require("./assets/images/contactBg.png"),
        require("./assets/images/carousel-next.orig.png"),
        require("./assets/images/icon_ios.png"),
        require("./assets/images/game/bgOld.png"),
        require("./assets/images/game/genericQuestionBg.png"),
        require("./assets/images/game/bgOld.orig.png"),
        require("./assets/images/game/bg2.png"),
        require("./assets/images/game/bg.png"),
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
        require("./assets/images/sidebar_bg.png"),
        require("./assets/images/carousel-next.png"),
        require("./assets/images/app_logo.orig.png"),
        require("./assets/images/home_bg.png"),
        require("./assets/images/logo.png"),
        require("./assets/images/carousel-prev.png"),
        require("./assets/images/tutorial2.orig.png"),
        require("./assets/images/tutorial3.orig.png"),
        require("./assets/images/rain_back.orig.png"),
        require("./assets/images/share.png"),
        require("./assets/images/teams/colon.orig.png"),
        require("./assets/images/teams/colon.png"),
        require("./assets/images/teams/patronato.png"),
        require("./assets/images/teams/patronato.orig.png"),
        require("./assets/images/ball_old.orig.png"),
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
        require("./assets/images/ball.orig.png"),
        require("./assets/images/noticeBg.png"),
        require("./assets/images/tutorial2.png"),
        require("./assets/images/menu.orig.png"),
        require("./assets/images/rain.png"),
        require("./assets/images/tutorial3.png"),
        require("./assets/images/bg.png"),
      ]),
      ...serverAssets,
    ]);

  }, [Font]);

  // Bootstrap Async
  const bootstrapAsync = useCallback(async () => {
    await loadResourcesAsync();
    let userToken;
    try {
      setIsLoadingComplete(true);
    } catch (e) {
      console.log(`bootstrapAsync`, e);
      setIsLoadingComplete(true);
      setIsLoadingError(true);
    }
  }, [loadResourcesAsync]);
  // Mount
  useEffect(() => {
    bootstrapAsync();
  }, [bootstrapAsync]);

  if (!isLoadingComplete) {
    return <AppLoading />;
  }
  if (isLoadingError) {
    return (
      <Root>
        <StyleProvider style={AppTheme}>
          <Container>
            <Header />
            <Content>
              <Text>
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
      <StyleProvider style={AppTheme}>
        <RecoilRoot>
          <Navigation isLoggedIn={false} />
        </RecoilRoot>
      </StyleProvider>
    </Root>
  );

};

export default App;