import React, { Component } from "react";
import {
    View
} from "react-native";

import Reflux from 'reflux';

import { Text } from 'native-base'
import { connectStyle } from 'native-base';



import Layout from '../../constants/Layout';

import GameWait from './GameWait';
import GameBall from './GameBall';
import GameQuestion from './GameQuestion';
import GameAnswerResult from './GameAnswerResult';


// store
import {TriviaQuestion} from '../../store/TriviaQuestion';

/**
 * 
 */

class GamePlay extends Reflux.Component {
    state={
        hasResult:true
    }
    constructor(props){
        super(props);
        this.store = TriviaQuestion;
    }
    onQuestionTimeout(){
        console.log("Question timedout");
    }
    renderBall(){
        if(this.state.hasResult){
            return;
        }
        return
        (
        <View style={styles.ballContainer}>
            <GameBall onTimeout={this.onQuestionTimeout} />
        </View>
        );
    }
    renderCurrentQuestion(){
        if(this.state.hasQuestion){
            return (<GameQuestion question={this.state.currentQuestion} />);
        } else{
            if(this.state.hasResult){
                return (<GameAnswerResult />);    
            }
            return (<GameWait />);
        }
    }
    render(){
        const ratio = Layout.window.ratio;
        const styles = this.props.style;
        return(
                <View style={styles.container}>
                        {this.renderBall()}
                        {this.renderCurrentQuestion()}
                </View>
        )
    }
}



export default connectStyle('SuperLiga.GamePlay')(GamePlay);
