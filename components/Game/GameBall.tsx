import React,
{
    Component, useState

} from "react";
import {
    View,
    Animated,
    Image,
} from "react-native";

import Reflux from 'reflux'




import Layout from '../../constants/Layout';
import GameBallCircularProgress from '../GameBallCircularProgress/src/GameBallCircularProgress'
// import  GameBallCircularProgress  from '../GameBallCircularProgress/GameBallCircularProgress'



// store
import { TriviaQuestion } from '../../store/TriviaQuestion';
import { useRecoilValue } from "recoil";
import { triviaQuestionAtom } from "../../recoil/TriviaQuestion.recoil";



// Styles
import styles from './GameBall.styles'
const ballImg = require('../../assets/images/ball.png');

const GameBall = (props) => {

    const [tintColor, setTinColor] = useState("#6adc95")
    const triviaQuestion = useRecoilValue(triviaQuestionAtom);
    // constructor(props){
    //     super(props);
    //     this.onBallFill = this.onBallFill.bind(this);
    //     this.onQuestionTimeout = this.onQuestionTimeout.bind(this);
    //     this.store = TriviaQuestion;
    // }
    const onBallFill = (i) => {
        if (i.value > 50) {
            setTinColor("#c73453");
        } else {
            setTinColor("#6adc95");
        }
    }
    const onQuestionTimeout = () => {
        //no dejar seleccionar
        //esperar por respuesta del operario del servidor
        props.onTimeout();
    }

    const ratio = Layout.window.ratio;
    
    let fill = 0;
    const timestamp = new Date().getTime();
    const timestampDif = (timestamp - triviaQuestion.currentTimestap);
    let duration = triviaQuestion.currentTimeout - timestampDif;
    if (duration < 0) {
        duration = 0;
    }
    //console.log("hasQuestion",this.state.hasQuestion);
    //duration = 6000;
    if (triviaQuestion.hasQuestion) {
        fill = 100;
    } else {
        duration = 0;
        fill = 0;
    }
    return (
        <View style={styles.container}>
            <GameBallCircularProgress
                // ref={(ref) => this.circularProgress = ref}
                size={165 * Layout.window.ratio}
                width={20 * Layout.window.ratio}
                duration={duration}
                fill={fill}
                backgroundColor="rgba(255,255,255,0.42)"
                tintColor={tintColor}
                animationListener={onBallFill}
                onAnimationComplete={onQuestionTimeout}
            >
                {
                    (fill) => (
                        <Animated.Image source={ballImg} style={styles.ballImg} />
                    )
                }
            </GameBallCircularProgress>
        </View>
    )

}

export default GameBall;