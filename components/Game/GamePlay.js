import React, { Component } from "react";
import {
    View
} from "react-native";

import Reflux from 'reflux';

import { connectStyle } from 'native-base';



import Layout from '../../constants/Layout';

import GameWait from './GameWait';
import GameBall from './GameBall';
import GameQuestion from './GameQuestion';
import GameAnswerResult from './GameAnswerResult';


// store
import {TriviaQuestion,TriviaQuestionActions} from '../../store/TriviaQuestion';

/**
 * 
 */

class GamePlay extends Reflux.Component {
    constructor(props){
        super(props);
        this.store = TriviaQuestion;
    }
    onQuestionTimeout(){
        console.log("Question ball timedout " + new Date());
    }
    _renderBall(){
        const styles = this.props.style;
        const duration = this.state.currentTimeout;
        return (  
            <View style={styles.ballContainer}>  
            <GameBall hasQuestion={this.state.hasQuestion} onTimeout={this.onQuestionTimeout} currentTimeout={duration} currentTimestap={this.state.currentTimestap}/>
            </View>
        );

    }
    componentDidUpdate(){
        console.log("did update");
        if(this.state.hasResult){
            const win = this.state.win;
            const serverSuccess = this.state.serverSuccess;
            TriviaQuestionActions.reset();
            this.props.navigation.navigate('GameResult', {
                win: win,
                serverSuccess: serverSuccess,
              });
        }
    }
    _renderCurrentQuestion(){
        if(this.state.hasQuestion && !this.state.hasResult ){
            return (<GameQuestion question={this.state.currentQuestion} />);
        } else{
            return (<GameWait text={'ESPERANDO \n JUGADA'} />);
        }
    }
    render(){
        const ratio = Layout.window.ratio;
        const styles = this.props.style;
        return(
                <View style={styles.container}>
                        {this._renderBall()}
                        {this._renderCurrentQuestion()}
                </View>
        )
    }
}



export default connectStyle('SuperLiga.GamePlay')(GamePlay);
