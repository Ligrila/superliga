import React, 
{ 
    Component 

} from "react";
import {
    View,
    Animated,
    Image,
} from "react-native";

import Reflux from 'reflux'
import { connectStyle } from 'native-base';



import Layout from '../../constants/Layout';
import {GameBallCircularProgress} from '../GameBallCircularProgress'
import ballImg from '../../assets/images/ball.png';


// store
import {TriviaQuestion} from '../../store/TriviaQuestion';

/**
 * 
 */

class GameBall extends Reflux.Component {
    state = {
        tintColor: "#6adc95"
    }
    constructor(props){
        super(props);
        this.onBallFill = this.onBallFill.bind(this);
        this.onQuestionTimeout = this.onQuestionTimeout.bind(this);
        this.store = TriviaQuestion;
    }
    onBallFill(i){
        if(i.value>50){
            this.setState({tintColor:"#c73453"});
        } else{
            this.setState({tintColor:"#6adc95"});
        }
    }
    onQuestionTimeout(){
        //no dejar seleccionar
        //esperar por respuesta del operario del servidor
        this.props.onTimeout();
    }
    render(){
        const ratio = Layout.window.ratio;
        const styles = this.props.style;
        let fill = 0;
        const timestamp = new Date().getTime();
        const timestampDif = (timestamp - this.state.currentTimestap);
        let duration = this.state.currentTimeout - timestampDif;
        if(timestampDif<0){
            timeout = 0;
        }
        //console.log("hasQuestion",this.state.hasQuestion);
        //duration = 6000;
        if(this.state.hasQuestion){
            fill = 100;
        } else{
            duration = 0;
            fill=0;
        }
        return(
                <View style={styles.container}>
                    <GameBallCircularProgress
                            ref={(ref) => this.circularProgress = ref}
                            size={175 * Layout.window.ratio}
                            width={20 * Layout.window.ratio}
                            duration={duration}
                            fill={fill}
                            backgroundColor="rgba(255,255,255,0.42)"
                            tintColor={this.state.tintColor}
                            animationListener={this.onBallFill}
                            onAnimationComplete={this.onQuestionTimeout}
                            >
                            {
                                (fill) => (
                                    <Animated.Image source={ballImg}  style={styles.ballImg}/> 
                                )
                            }
                    </GameBallCircularProgress>
                </View>
        )
    }
}



export default connectStyle('SuperLiga.GameBall')(GameBall);
