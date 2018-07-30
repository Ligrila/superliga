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
import {TriviaQuestion} from '../../store/TriviaQuestion';

/**
 * 
 */

class GamePlay extends Reflux.Component {
    constructor(props){
        super(props);
        this.store = TriviaQuestion;
    }
    onQuestionTimeout(){
        console.log("Question timedout");
    }
    _renderBall(){
        const styles = this.props.style;
        return (  
            <View style={styles.ballContainer}>  
            <GameBall onTimeout={this.onQuestionTimeout} />
            </View>
        );

    }
    componentDidUpdate(){
        console.log("did update");
        if(this.state.hasResult){
            this.props.navigation.navigate('GameResult', {
                win: this.state.win,
                serverSuccess: this.state.serverSuccess,
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
