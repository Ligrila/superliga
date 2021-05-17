import React, { useCallback, useEffect, useState } from "react";
// Native
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  Modal,
  View,
  Keyboard,
} from "react-native";
// native Base
import {
  Container,
  Content,
  Footer,
  Text,
  Spinner,
} from "native-base";

import { StackActions, NavigationActions } from "react-navigation";
// Components
import Wallpaper from "../../components/Wallpaper/Wallpaper";
import AppHeader from "../../components/AppHeader/AppHeader";
// usado para entre tiempo
// y final
import Api from "../../api/Api";
import Game from "../../components/Game/Game";
import GameConnectedUsers from "../../components/Game/GameConnectedUsers";

import Reflux from "reflux";
import { NextTriviaStore, NextTriviaActions } from "../../store/NextTriviaStore";
import { UsersStore, UsersActions } from "../../store/UserStore";
import Purchase from "../../components/Purchase";
import { PurchaseModalStore } from "../../store/PurchaseModalStore";
import { TriviaQuestion } from "../../store/TriviaQuestion";
import MakeItRain from "../../components/MakeItRain";
import Chat from '../../components/Chat'
// Expo
import Constants from 'expo-constants';
// Advertising
import { AdMobInterstitial } from 'expo-ads-admob';
// Styles
import styles from './GameScreen.style'
import Layout from "../../constants/Layout";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
// Recoil
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import { authUserAtom, authUserSelector } from "../../recoil/Auth.recoil";
import { currentTriviaAtom, currentTriviaFinishedAtom, currentTriviaSelector, GamePlayStatus } from "../../recoil/CurrentTrivia.recoil";
import { triviaQuestionAtom } from "../../recoil/TriviaQuestion.recoil";

// Bg
const gameBgSrc = require("../../assets/images/game/bg.png");
const gamePlayBgSrc = require("../../assets/images/game/game_bg.png");
const gameDisabledBgSrc = require("../../assets/images/result/wrong_bg.png");
const bgProgrammedTriviaSrc = require("../../assets/images/programmed-trivia-bg.png");
const genericQuestionBg = require("../../assets/images/game/genericQuestionBg.png");

const getAdMobInterstitialID = () => {
  const isAndroid = Layout.isAndroid;
  if (Constants.appOwnership == "expo") {
    return isAndroid
      ? "ca-app-pub-4248217184030056/6826064667"
      : "ca-app-pub-4248217184030056/4404927217";
  }

  return isAndroid
    ? "ca-app-pub-4248217184030056/9594987792"
    : "ca-app-pub-4248217184030056/1391751063";
};

const GameScreen = () => {
  const api = new Api();
  // Auth User
  const [authUser, setAuthUser] = useRecoilState(authUserAtom);
  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  // Keyboard
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  // Current Trivia
  const [currentTrivia, setCurrentTrivia] = useRecoilState(currentTriviaAtom);
  const currentTriviaFinished = useRecoilValue(currentTriviaFinishedAtom);
  // Trivia Questions
  const triviaQuestion = useRecoilValue(triviaQuestionAtom)
  // Navigation
  const navigation = useNavigation();

  // ADS
  const renderInterstitial = async () => {
    await AdMobInterstitial.setAdUnitID(getAdMobInterstitialID());
    await AdMobInterstitial.requestAdAsync();
    await AdMobInterstitial.showAdAsync();
  }


  //#region Keyboard
  const _keyboardDidShow = () => {
    setKeyboardVisible(true);
  };

  const _keyboardDidHide = () => {
    setKeyboardVisible(false);
  };

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);
  // Update Current User
  const updateCurrentUser = useRecoilCallback(({ snapshot }) => async () => {
    const authUserResponse = await snapshot.getPromise(authUserSelector);
    setAuthUser({ ...authUserResponse });
  });
  // Update Current Trivia
  const updateCurrentTrivia = useRecoilCallback(({ snapshot }) => async () => {
    const currentTriviaResponse = await snapshot.getPromise(currentTriviaSelector);
    const currentTriviaObj = currentTriviaResponse ? { ...currentTriviaResponse } : currentTriviaResponse;
    setCurrentTrivia(currentTriviaObj);
  });
  //#endregion Keyboard
  const updateNeccesaryData = useCallback(async () => {
    // Get Latest info of user
    updateCurrentUser();
    // Update Current Triva
    updateCurrentTrivia();
  }, [])
  // Update Always focus
  useFocusEffect(
    useCallback(() => {
      updateNeccesaryData();
      return () => { };
    }, []))
  //#region Changes Current Trivia
  const processChangesCurrentTriva = useCallback(() => {
    if (currentTrivia && currentTrivia.hasData) {
      const currentTriviaData = currentTrivia.data;
      if (currentTriviaData) {
        const gamePlayStatus = currentTriviaData.gamePlayStatus ? currentTriviaData.gamePlayStatus : null;
        console.log('gamePlayStatus', gamePlayStatus);
        switch (gamePlayStatus) {
          case GamePlayStatus.FINISH_HALF_TIME: {
            navigation.navigate("HalfTime");
            break;
          }
          case GamePlayStatus.START_HALF_TIME: {
            navigation.navigate("HalfTimeStart");
            break;
          }
          case GamePlayStatus.START_HALF_TIME_PLAY: {
            navigation.navigate("GameHalfTimePlay");
            break;
          }
          case GamePlayStatus.SHOW_BANNER_GAME: {
            const payload = currentTriviaData.bannerData;
            if (payload.bannerType == "admob") {
              renderInterstitial();
            } else {
              navigation.navigate("Banner", { payload });
            }
            break;
          }
          case GamePlayStatus.START_EXTRA_PLAY: {
            navigation.navigate("GameExtraPlay");
            break;
          }
          case GamePlayStatus.FINISH_GAME: {
            // navigation.navigate("GameExtraPlay");
            break;
          }
          // case GamePlayStatus.FINISH_TRIVIA: {
            
          // }
        }
        // HalfTime
        // HalfTimeStart
        // GameHalfTimePlay
        // Show Banner
        // GameExtraPlay
        // GameEnd
      }

    }

  }, [currentTrivia])


  useEffect(() => {
    processChangesCurrentTriva()
  }, [currentTrivia])
  //#endregion Changes Current Trivia

  //#region Changes Finished Trivia
  const processChangesFinishTriva = useCallback(()=>{
    const currentTriviaId = currentTriviaFinished.data.id;

    const trivia = {
      type: currentTriviaFinished.data.type
    }
    // console.log(JSON.stringify(currentTriviaData));
    // console.log(JSON.stringify(trivia));
    // console.log('id', currentTriviaId);
    const resetAction = {
      index: 0,
      routes: [{ name: 'GameEnd', params: { currentTriviaId, trivia } }]
    }
    navigation.reset(resetAction);

  },[currentTriviaFinished]);
  useEffect(() => {
    if(currentTriviaFinished && currentTriviaFinished.hasData){
      processChangesFinishTriva()
    }
    
  }, [currentTriviaFinished])
  //#endregion Changes Finished Trivia


  const handlerSetModalVisibleProp = () => {

  }
  const onSetModalVisible = (visible) => {
    setModalVisible(visible)
  };
  const renderModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <Purchase
          onHidePress={() => setModalVisible(false)}
        />
      </Modal>
    );
  }
  const renderFooter = () => {
    if (keyboardVisible) {
      return null;
    }
    if (authUser) {
      const hasLives = authUser.lives >= 1;
      if (hasLives) {
        return <GameConnectedUsers />;
      } else {
        return (
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text style={styles.noLifeText}>
              Si queres seguir jugando hace click aca
            </Text>
          </TouchableOpacity>
        );
      }
    }
    return <GameConnectedUsers />;
  }
  const renderGame = () => {
    // console.log('currentTrivia', JSON.stringify(currentTrivia));
    if (currentTrivia && currentTrivia.hasData) {
      return (
        <Game
          currentTrivia={currentTrivia.data}
          onNoLife={() => setModalVisible(true)}
          setModalVisibleProp={handlerSetModalVisibleProp}
        ></Game>
      );
    } else {
      return <Spinner />;
    }
  }
  // Make it Rain :)
  const makeItRain = () => {
    if (triviaQuestion) {
      if (triviaQuestion.hasResult && triviaQuestion.win) {
        return <MakeItRain />;
      }
    }
  };

  let bgSrc = gameBgSrc;


  // Current Trivia
  if (currentTrivia && currentTrivia.data) {
    if (
      currentTrivia.data.half_time_finished &&
      currentTrivia.data.half_time_started
    ) {
      bgSrc = genericQuestionBg;
    }
    if (currentTrivia.data.type == "trivia") {
      bgSrc = bgProgrammedTriviaSrc;
    }
    if (currentTrivia.data.game_finished) {
      bgSrc = genericQuestionBg;
    }
  }
  if (authUser) {
    bgSrc = authUser.lives <= 0 ? gameDisabledBgSrc : gameBgSrc;
  }
  // Trivia Question
  if (triviaQuestion && triviaQuestion.hasQuestion) {
    bgSrc = gamePlayBgSrc;
  }


  return (
    <Container>
      <Wallpaper source={bgSrc}>
        {makeItRain()}
        <AppHeader game={true} logo={true} logoDisablePress={true} />
        {/* Content */}
        <Content
          padder contentContainerStyle={styles.game}>
          {renderModal()}
          {renderGame()}
          <View style={styles.footer}>
            {/* <Chat /> */}
            <View style={styles.connectedUsers}>{renderFooter()}</View>
          </View>
        </Content>
      </Wallpaper>
    </Container>
  );

}

//export default connectStyle('SuperLiga.GameScreen')(GameScreen);
export default GameScreen;
