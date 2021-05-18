import React, { useCallback, useEffect, useRef } from "react";
import { View } from "react-native";

import Reflux from "reflux";


import GameWait from "./GameWait";
import GameBall from "./GameBall";
import GameQuestion from "./GameQuestion";
import GameAnswerResult from "./GameAnswerResult";

// store
import {
  TriviaQuestion,
  TriviaQuestionActions,
} from "../../store/TriviaQuestion";
import { UsersStore } from "../../store/UserStore";
import BottomBanner from "../Adds/BottomBanner";
// The friend recoil :)
import { useRecoilState, useRecoilValue } from "recoil";
import { triviaQuestionAtom } from "../../recoil/TriviaQuestion.recoil";
// Styles 
import styles from './GamePlay.styles'
import { authUserAtom } from "../../recoil/Auth.recoil";
import TriviaQuestionUtility from "../../utilities/Trivia/TriviaQuestion.utility";


const GamePlay = ({ onNoLife, setModalVisibleProp }) => {
  // we can save timer in useRef and pass it to child
  const resetTimeOut = useRef<any>(null);
  // Trivia Question
  const [triviaQuestion, setTriviaQuestion] = useRecoilState(triviaQuestionAtom);
  // Auth user
  const authUser = useRecoilValue(authUserAtom);
  // constructor(props) {
  //   super(props);
  //   this.stores = [TriviaQuestion, UsersStore];
  // }
  const onQuestionTimeout = () => {
    //console.log("Question ball timedout " + new Date());
  }
  const _renderBall = () => {
    if (triviaQuestion.hasResult) {
      const win = triviaQuestion.win;
      const serverSuccess = triviaQuestion.serverSuccess;
      const lives = authUser.lives;
      const canceled = triviaQuestion.currentQuestion.canceled;
      const points = triviaQuestion.currentQuestion.points;
      return (
        <GameAnswerResult
          win={win}
          serverSuccess={serverSuccess}
          lives={lives}
          canceled={canceled}
          points={points}
        ></GameAnswerResult>
      );
    }
    // const duration = triviaQuestion.currentTimeout;
    return (
      <View style={styles.ballContainer}>
        <GameBall onTimeout={onQuestionTimeout} />
      </View>
    );
  }

  const _renderCurrentQuestion = () => {
    if (triviaQuestion.hasQuestion || triviaQuestion.hasResult) {
      return (
        <GameQuestion
          question={triviaQuestion.currentQuestion}
          onNoLife={onNoLife}
        />
      );
    } else {
      return (
        <View style={styles.containerWait}>
          <GameWait text={"ESPERANDO \n JUGADA"} />
          <BottomBanner></BottomBanner>
        </View>
      );
    }
  }
  const onUpdateTriviaQuestion = useCallback(() => {
    if (resetTimeOut.current) {
      clearTimeout(resetTimeOut.current);
    }
    if (triviaQuestion.hasResult) {
      const win = triviaQuestion.win;
      const serverSuccess = triviaQuestion.serverSuccess;
      if (!serverSuccess) {
        if (authUser && authUser.lives <= 0) {
          // no está jugando porque no puede, no tiene vidas.
          return;
        }
      }
      resetTimeOut.current = setTimeout(() => {
        setTriviaQuestion(TriviaQuestionUtility.getReset())
      }, 6000);
    }
  }, [triviaQuestion])
  useEffect(() => {
    if (triviaQuestion) {
      onUpdateTriviaQuestion();
    }
  }, [triviaQuestion, onUpdateTriviaQuestion])
  return (
    <View style={styles.container}>
      {/* Ball */}
      {_renderBall()}
      {/* Question Or Waiting */}
      {_renderCurrentQuestion()}
    </View>
  );

}

export default GamePlay;
