import React, { Component } from "react";
import {
    View,
    TouchableWithoutFeedback,
    Vibration
} from "react-native";

import { Text, Button, Icon, Toast } from 'native-base'
import { connectStyle } from 'native-base';

import Api from '../../api/Api';


import Layout from '../../constants/Layout';

// store
import Reflux from 'reflux';
import { TriviaQuestion, TriviaQuestionActions } from "../../store/TriviaQuestion";
import { UsersStore } from "../../store/UserStore";
import Segment from "../../Theme/components/Segment";
import { NextTriviaStore } from "../../store/NextTriviaStore";
import { ACTION_VOICE_CONTROL_BATTERY_SAVER_MODE } from "expo/build/IntentLauncherAndroid/IntentLauncherAndroid";


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

        
        

        this.stores = [TriviaQuestion, UsersStore, NextTriviaStore];
    }
    _sendAnswer = async(option) => {
        let response = this.api.sendAnswer(this.props.question.id,option).catch((e)=>{
            Toast.show({
                text: 'Ocurrió un error al enviar la respuesta. Por favor, intenta nuevamente.',
                position: "bottom",
                type: 'danger',
                buttonText: 'Aceptar'
              })
              TriviaQuestionActions.resetOnNetworkFail()
              this.setState({button1Pressed:false,disabled:false});
              this.setState({button2Pressed:false});
              this.setState({button3Pressed:false});

        })
        //if(response.success){
            TriviaQuestionActions.answerQuestion(this.props.question.id,option,response);
        //1}
        
    }
    onButton1Press = () => {
        this.setState({button1Pressed:true,disabled:true});
        this._sendAnswer(1);
    }
    onButton2Press= () =>{
        this.setState({button2Pressed:true,disabled:true});
        this._sendAnswer(2);
    }
    onButton3Press= () =>{
        this.setState({button3Pressed:true,disabled:true});
        this._sendAnswer(3);
    }
    componentDidMount(){
        this.questionListener = TriviaQuestionActions.onNewQuestion.listen(
            (q) => {
                Vibration.vibrate();
            }
        )
    }
    componentWillUnmount(){
        super.componentWillUnmount();
        if(this.questionListener){
            this.questionListener();
        }
    }
    showPurchaseModal = (lives) => {
        if(lives<=0){
            //intenta jugar sin vidas
            // llegamos hasta 
            // GameScreen setModalVisible(true)
            this.props.onNoLife();
        }
    }
    button1AddOn = () => {
        if(!this.state.hasResult || this.state.correctOption!='option_1'){
            return null;
        }
        const styles = this.props.style;
        return (<Icon type='FontAwesome' name='check' style={styles.correctQuestionIcon}></Icon>)
    }
    button2AddOn = () => {
        if(!this.state.hasResult || this.state.correctOption!='option_2'){
            return null;
        }
        const styles = this.props.style;
        return (<Icon type='FontAwesome' name='check' style={styles.correctQuestionIcon}></Icon>)
    }
    button3AddOn = () => {
        if(!this.state.hasResult || this.state.correctOption!='option_3'){
            return null;
        }
        const styles = this.props.style;
        return (<Icon type='FontAwesome' name='check' style={styles.correctQuestionIcon}></Icon>)
    }
    primaryButtonColor = () => {
        if(this.state.CurrentTrivia.Trivia.type == 'trivia'){
            return '#cc366b';
        }
        return '#7b4295';
    }
    button1Styles = () => {
        return this.state.button1Pressed ? {backgroundColor:this.primaryButtonColor()} : {backgroundColor: '#ededed'};
    }
    button2Styles = () => {
        return this.state.button2Pressed ? {backgroundColor:this.primaryButtonColor()} : {backgroundColor: '#ededed'};
    }
    button3Styles = () => {
        return this.state.button3Pressed ? {backgroundColor:this.primaryButtonColor()} : {backgroundColor: '#ededed'};
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

    processCurrentQuestion(){
        if(this.state.hasResult){
            const win = this.state.win;
            const serverSuccess = this.state.serverSuccess;
            if(!serverSuccess){
                if(this.state.hasInformation && this.state.user.lives <=0){
                    // no está jugando porque no puede, no tiene vidas.
                    console.log("El usuario no esta jugando se ignora");
                    return;
                }
            }

            setTimeout(()=>{TriviaQuestionActions.reset();},6000)
        }
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
        const Trivia = this.state.CurrentTrivia.Trivia
        const genericQuestionsCount = Trivia.generic_questions_count
        const currentCuestionPosition = this.state.currentQuestion.position
        const showQuestionPosition = Trivia.type=='trivia'
        let questionPositionMarkup = null
        if(showQuestionPosition){
            subtitle  = subtitle + "\n" + currentCuestionPosition +  " de " + genericQuestionsCount
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
        let titleTags = (
            <View>
            <Text style={{...styles.text,...titleStyles}}>{title}</Text>
            </View>
            );
        let bottomTags = (
            <View>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
        )
        if(this.state.hasResult){
            titleTags = bottomTags = null;
        }
        return(
                <View style={styles.container}>
                   {titleTags}
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
                                {this.button1AddOn()}
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
                                {this.button2AddOn()}
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
                                {this.button3AddOn()}
                            </Button>
                        </View>
                    </TouchableWithoutFeedback>
                    {bottomTags}
                </View>
        )
    }
}



export default connectStyle('SuperLiga.GameQuestion')(GameQuestion);
