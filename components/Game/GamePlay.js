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
import { UsersStore } from "../../store/UserStore";
import BottomBanner from "../Adds/BottomBanner";

/**
 * 
 */

class GamePlay extends Reflux.Component {
    constructor(props){
        super(props);
        this.stores = [TriviaQuestion,UsersStore];
    }
    onQuestionTimeout(){
        //console.log("Question ball timedout " + new Date());
    }
    _renderBall(){
        if(this.state.hasResult){
            const win = this.state.win;
            const serverSuccess = this.state.serverSuccess;
            const lives = this.state.user.lives;
            const canceled = this.state.currentQuestion.canceled;
            const points = this.state.currentQuestion.points;
            return <GameAnswerResult
                win={win} serverSuccess={serverSuccess}
                lives={lives} canceled={canceled} points={points}
            ></GameAnswerResult>;
        }
        const styles = this.props.style;
        const duration = this.state.currentTimeout;
        return (  
            <View style={styles.ballContainer}>  
            <GameBall onTimeout={this.onQuestionTimeout}/>
            </View>
        );

    }
    resetTimeOut = null;
    componentWillUnmount(){
        clearTimeout(this.resetTimeOut);
        super.componentWillUnmount();
    }
    componentDidUpdate(){
        clearTimeout(this.resetTimeOut);
        if(this.state.hasResult){
            const win = this.state.win;
            const serverSuccess = this.state.serverSuccess;
            if(!serverSuccess){
                if(this.state.hasInformation && this.state.user.lives <=0){
                    // no está jugando porque no puede, no tiene vidas.
                    return;
                }
            }
            this.resetTimeOut = setTimeout(()=>{
                TriviaQuestionActions.reset();    
            },6000)
            /*const currentQuestion = this.state.currentQuestion;
            TriviaQuestionActions.reset();
            this.props.navigation.navigate('GameResult', {
                win: win,
                canceled: currentQuestion.canceled,
                lives: this.state.user.lives,
                points: currentQuestion.points,
                serverSuccess: serverSuccess,
                onNoLife: this.props.setModalVisibleProp
              });
              */

        }
    }
    _renderCurrentQuestion(){
        if(this.state.hasQuestion || this.state.hasResult ){
            return (<GameQuestion question={this.state.currentQuestion} onNoLife={this.props.onNoLife} />);
        } else{
            return (
            <View>
            <GameWait text={'ESPERANDO \n JUGADA'} />
            <BottomBanner></BottomBanner>
            </View>
            );
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
