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
        if(this.state.hasResult){
            return;
        }
        const styles = this.props.style;
        return (  
            <View style={styles.ballContainer}>  
            <GameBall onTimeout={this.onQuestionTimeout} />
            </View>
        );

    }
    _renderCurrentQuestion(){
        if(this.state.hasQuestion && !this.state.hasResult ){
            return (<GameQuestion question={this.state.currentQuestion} />);
        } else{
            if(this.state.hasResult){
                return (<GameAnswerResult win={this.state.win}/>);    
            }
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
