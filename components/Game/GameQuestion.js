import React, { Component } from "react";
import {
    View,
    TouchableWithoutFeedback
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
    showPurchaseModal = (lives) => {
        if(lives<=0){
            //intenta jugar sin vidas
            // llegamos hasta 
            // GameScreen setModalVisible(true)
            this.props.onNoLife();
        }
    }

    button1Styles = () => {
        return this.state.button1Pressed ? {backgroundColor:'#7b4295'} : {backgroundColor: '#ededed'};
    }
    button2Styles = () => {
        return this.state.button2Pressed ? {backgroundColor:'#7b4295'} : {backgroundColor: '#ededed'};
    }
    button3Styles = () => {
        return this.state.button3Pressed ? {backgroundColor:'#7b4295'} : {backgroundColor: '#ededed'};
    }
    button1TextStyles = () => {
        return this.state.button1Pressed ? {color:'#fff'} : {color: '#282828'};
    }
    button2TextStyles = () => {
        return this.state.button2Pressed ? {color:'#fff'} : {color: '#282828'};
    }
    button3TextStyles = () => {
        return this.state.button3Pressed ? {color:'#fff'} : {color: '#282828'};
    }
    getNumberOfLines(text, fontSize, fontConstant, containerWidth){

        let cpl = Math.floor(containerWidth / (fontSize / fontConstant) );
        const words = text.split(' ');
        const elements = [];
        let line = '';
    
        while(words.length > 0){
            if(line.length + words[0].length + 1 <= cpl || line.length === 0 && words[0].length + 1 >= cpl){
                let word = words.splice(0,1);
                if(line.length === 0){
                    line = word;
                }else {
                    line = line + " " + word;
                }
                if(words.length === 0){
                    elements.push(line);
                }
            }
            else {
                elements.push(line);
                line = "";
            }
        }
        return elements.length;
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
        let subtitle = `JUGAS POR ${this.props.question.points} PUNTOS`;
        let title = this.props.question.question.toUpperCase();
        const renderDisabled = this.state.timedOut || this.state.disabled || lives <= 0;
        if(this.state.timedOut && !this.state.answered){
            title= "SE ACABO\n EL TIEMPO";
            subtitle = 'JUGADA ANULADA';
        }
        if(this.state.answered){
            title= "ESPERANDO RESPUESTA";
        }
        const titleLength = title.length;
        //const cpl = Math.round((Layout.window.width - 40 ) / (styles.text.fontSize / 2.15))
        //const numberOfLines = titleLength / cpl;
        const numberOfLines = this.getNumberOfLines(title,styles.text.fontSize,2.15,(Layout.window.width - 40 ))
        let titleStyles = {};
        //console.log("titleLenght",titleLength);
        //console.log("nol",numberOfLines);
        if(numberOfLines>2){
            const newFontSize = ((styles.text.fontSize * 2) / numberOfLines)
            titleStyles = {fontSize: newFontSize}
            //console.log(titleStyles)
        }
        return(
                <View style={styles.container}>
                    <Text style={{...styles.text,...titleStyles}}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                    <TouchableWithoutFeedback
                    onPress={()=>{this.showPurchaseModal(lives)}}
                    >
                    <View>
                        <Button 
                            onPress={this.onButton1Press}
                            light={!this.state.button1Pressed}
                            primary={this.state.button1Pressed}
                            disabled={renderDisabled}
                            block
                            large
                            rounded style={{...styles.button,...this.button1Styles()}}>
                                <Text style={{...styles.buttonText,...this.button1TextStyles()}}>{this.props.question.option_1}</Text>
                        </Button>
                    </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                    onPress={()=>{this.showPurchaseModal(lives)}}
                    >
                        <View>
                            <Button
                                onPress={this.onButton2Press}
                                light={!this.state.button2Pressed}
                                primary={this.state.button2Pressed}
                                disabled={renderDisabled}
                                block
                                large
                                rounded style={{...styles.button,...this.button2Styles()}}>
                                <Text style={{...styles.buttonText,...this.button2TextStyles()}}>{this.props.question.option_2}</Text>
                            </Button>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                    onPress={()=>{this.showPurchaseModal(lives)}}
                    >
                        <View>
                            <Button
                                onPress={this.onButton3Press}
                                light={!this.state.button3Pressed}
                                primary={this.state.button3Pressed}
                                disabled={renderDisabled}
                                block
                                large
                                rounded style={{...styles.button,...this.button3Styles()}}>
                                <Text style={{...styles.buttonText,...this.button3TextStyles()}}>{this.props.question.option_3}</Text>
                            </Button>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
        )
    }
}



export default connectStyle('SuperLiga.GameQuestion')(GameQuestion);
