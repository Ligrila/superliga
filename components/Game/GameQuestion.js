import React, { Component } from "react";
import {
    View
} from "react-native";

import { Text, Button } from 'native-base'
import { connectStyle } from 'native-base';

import Api from '../../api/Api';


import Layout from '../../constants/Layout';

// store
import Reflux from 'reflux';
import { TriviaQuestion, TriviaQuestionActions } from "../../store/TriviaQuestion";
import { UsersStore } from "../../store/UserStore";


/**
 * 
 */

class GameQuestion extends Reflux.Component {
    api = new Api;
    state = {
        button1Pressed: false,
        button2Pressed: false,
        button3Pressed: false,
        disabled: false,
    }
    constructor(props){
        super(props);
        this._optionButton1 = this._optionButton2 = this._optionButton3= null;

        this.onButton1Press = this.onButton1Press.bind(this);
        this.onButton2Press = this.onButton2Press.bind(this);
        this.onButton3Press = this.onButton3Press.bind(this);

        this.stores = [TriviaQuestion, UsersStore];
    }
    async _sendAnswer(option){
        let response = this.api.sendAnswer(this.props.question.id,option);
        //if(response.success){
            TriviaQuestionActions.answerQuestion(this.props.question.id,option,response);
        //1}
        
    }
    onButton1Press(){
        this.setState({button1Pressed:true,disabled:true});
        this._sendAnswer(1);
    }
    onButton2Press(){
        this.setState({button2Pressed:true,disabled:true});
        this._sendAnswer(2);
    }
    onButton3Press(){
        this.setState({button3Pressed:true,disabled:true});
        this._sendAnswer(3);
    }
    componentDidMount(){
        
    }
    render(){
        const styles = this.props.style;
        let lives = 0;
        if(this.state.hasInformation){
            if(this.state.user.life){
                lives = this.state.user.life.lives;
            }
            if(this.state.user.infinite_lives && this.state.user.infinite_lives[0]){
                lives = 100000;
            }
        }
        const renderDisabled = this.state.timedOut || this.state.disabled || lives <= 0;
        return(
                <View style={styles.container}>
                    <Text style={styles.text}>{this.props.question.question.toUpperCase()}</Text>
                    <Button 
                        onPress={this.onButton1Press}
                        light={!this.state.button1Pressed}
                        primary={this.state.button1Pressed}
                        disabled={renderDisabled}
                        block
                        large
                        rounded style={styles.button}>
                        <Text style={styles.buttonText}>{this.props.question.option_1}</Text>
                    </Button>
                    <Button
                        onPress={this.onButton2Press}
                        light={!this.state.button2Pressed}
                        primary={this.state.button2Pressed}
                        disabled={renderDisabled}
                        block
                        large
                        rounded style={styles.button}>
                        <Text style={styles.buttonText}>{this.props.question.option_2}</Text>
                    </Button>
                    <Button
                        onPress={this.onButton3Press}
                        light={!this.state.button3Pressed}
                        primary={this.state.button3Pressed}
                        disabled={renderDisabled}
                        block
                        large
                        rounded style={styles.button}>
                        <Text style={styles.buttonText}>{this.props.question.option_3}</Text>
                    </Button>
                </View>
        )
    }
}



export default connectStyle('SuperLiga.GameQuestion')(GameQuestion);
