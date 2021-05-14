import React, { Component, useCallback, useEffect, useState } from "react";
import {
    View,
    TouchableWithoutFeedback,
    Vibration
} from "react-native";
import { Text, Button, Icon, Toast } from 'native-base'
import Api from '../../api/Api';
import Layout from '../../constants/Layout';

// store
import Reflux from 'reflux';
import { TriviaQuestion, TriviaQuestionActions } from "../../store/TriviaQuestion";
import { UsersStore } from "../../store/UserStore";
import { NextTriviaStore } from "../../store/NextTriviaStore";

import { useRecoilState, useRecoilValue } from "recoil";
import { triviaQuestionAtom } from "../../recoil/TriviaQuestion.recoil";
import TriviaQuestionUtility from "../../utilities/Trivia/TriviaQuestion.utility";
import { authUserAtom } from "../../recoil/Auth.recoil";
import { currentTriviaAtom } from "../../recoil/CurrentTrivia.recoil";
// Styles
import styles from './GameQuestion.styles'
import Variables from '../../styles/Variables'

interface GameQuestionInterface {
    question: any
    onNoLife: () => void
}

const GameQuestion = (props: GameQuestionInterface) => {
    const api = new Api;
    const [disabled, setDisabled] = useState(false);
    const authUser = useRecoilValue(authUserAtom);
    // Initial State
    const intialState = {
        button1Pressed: false,
        button2Pressed: false,
        button3Pressed: false,
    }
    const [buttonsState, setButtonsState] = useState({
        ...intialState
    });
    // Trivia Question
    const [triviaQuestion, setTriviaQuestion] = useRecoilState(triviaQuestionAtom);
    // Current Trivia
    const currentTrivia = useRecoilValue(currentTriviaAtom);
    // state = {
    //     button1Pressed: false,
    //     button2Pressed: false,
    //     button3Pressed: false,
    //     disabled: false,
    // }
    // constructor(props){
    //     super(props);
    //     this._optionButton1 = this._optionButton2 = this._optionButton3= null;
    //     this.stores = [TriviaQuestion, UsersStore, NextTriviaStore];
    // }
    const _sendAnswer = async (option) => {

        let response = api.sendAnswer(props.question.id, option).catch((e) => {
            Toast.show({
                text: 'Ocurrió un error al enviar la respuesta. Por favor, intenta nuevamente.',
                position: "bottom",
                type: 'danger',
                buttonText: 'Aceptar'
            })
            setButtonsState({ ...intialState })
            setDisabled(false);
            setTriviaQuestion({ ...TriviaQuestionUtility.getResetOnNetworkFail() })
        });
        // console.log('_sendAnser', response)
        // TriviaQuestionActions.answerQuestion(props.question.id, option, response);
        //   this.setState({button1Pressed:false,disabled:false});
        //   this.setState({button2Pressed:false});
        //   this.setState({button3Pressed:false});          
        //necesitamos saber si response llego a destino antes de dar veredicto.
        /*response.then((data)=>{
            console.log(data);
        })*/
        if (triviaQuestion.currentQuestion.id == props.question.id) {
            // this.setState({
            //     answered: true,
            //     answeredOption: 'option_' + option,
            //     answeredServerResponse: response
            // });
            const answerTriviaQuestion = TriviaQuestionUtility.answerQuestion(triviaQuestion, option, response);
            setTriviaQuestion({ ...answerTriviaQuestion });
        } else {
            console.warn("Intentando responder a una pregunta que no es la actual");
        }

        //if(response.success){

        //1}

    }
    const onButtonPress = (button) => {
        setButtonsState(prevState => ({ ...prevState, [`button${button}Pressed`]: true }))
        setDisabled(true);
        _sendAnswer(button)
    }

    // componentDidMount(){
    //     this.questionListener = TriviaQuestionActions.onNewQuestion.listen(
    //         (q) => {
    //             Vibration.vibrate();
    //         }
    //     )
    const resetValues = useCallback(()=>{
        setButtonsState({...intialState});
        setDisabled(false);
    },[])
    // Vibrate on Add New Question
    useEffect(() => {
        if(triviaQuestion){
            // Reset Values When response
            if(!triviaQuestion.answered){
                    resetValues()
            }
            console.log('Vibrate');
            // resetValues();
            Vibration.vibrate();
        }
    }, [triviaQuestion])
    const showPurchaseModal = (lives) => {
        if (lives <= 0) {
            //intenta jugar sin vidas
            // llegamos hasta 
            // GameScreen setModalVisible(true)
            props.onNoLife();
        }
    }
    const buttonAddon = (option) => {
        if (!triviaQuestion.hasResult || triviaQuestion.correctOption != `option_${option}`) {
            return null;
        }
        return (<Icon type='FontAwesome' name='check' style={styles.correctQuestionIcon}></Icon>)
    }

    const primaryButtonColor = () => {
        if (currentTrivia.type == 'trivia') {
            return Variables.brandTrivia;
        }
        return Variables.brandPrimary;
    }
    const buttonStyles = (option) => {
        return buttonsState[`button${option}Pressed`] ? { backgroundColor: primaryButtonColor() } : { backgroundColor: Variables.light };
    }
    const buttonTextStyles = (option) => {
        return buttonsState[`button${option}Pressed`] ? { color: Variables.white } : { color: Variables.dark };
    }

    const getNumberOfLines = (text, fontSize, fontConstant, containerWidth) => {

        let cpl = Math.floor(containerWidth / (fontSize / fontConstant));
        const words = text.split(' ');
        const elements: any = [];
        let line = '';

        while (words.length > 0) {
            if (line.length + words[0].length + 1 <= cpl || line.length === 0 && words[0].length + 1 >= cpl) {
                let word = words.splice(0, 1);
                if (line.length === 0) {
                    line = word;
                } else {
                    line = line + " " + word;
                }
                if (words.length === 0) {
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


    // Lives
    let lives = 0;
    if (authUser) {
        if (authUser.life) {
            lives = authUser.life.lives;
        }
        if (authUser.infinite_lives && authUser.infinite_lives[0]) {
            lives = 100000;
        }
    }
    // Titles
    let subtitle = `JUGAS POR ${props.question.points} PUNTOS`;
    let title = props.question.question.toUpperCase();
    const renderDisabled = triviaQuestion.timedOut || disabled || lives <= 0;
    if (triviaQuestion.timedOut && !triviaQuestion.answered) {
        title = "SE ACABO EL TIEMPO";
        subtitle = 'JUGADA ANULADA';
    }
    if (triviaQuestion.answered) {
        title = "ESPERANDO RESPUESTA";
    }

    const genericQuestionsCount = currentTrivia.generic_questions_count
    const currentCuestionPosition = triviaQuestion.position > genericQuestionsCount ? genericQuestionsCount : triviaQuestion.position
    const showQuestionPosition = currentTrivia.type == 'trivia'
    if (showQuestionPosition) {
        subtitle = subtitle + "\n" + currentCuestionPosition + " de " + genericQuestionsCount
    }

    const numberOfLines = getNumberOfLines(title, styles.text.fontSize, 2.15, (Layout.window.width - 50))
    let titleStyles = {};

    
    if (numberOfLines > 2) {
        const newFontSize = ((styles.text.fontSize * 2) / numberOfLines)
        titleStyles = { fontSize: newFontSize }
    }
    let titleTags: any = (
        <View>
            <Text style={{ ...styles.text, ...titleStyles }}>{title}</Text>
        </View>
    );
    let bottomTags: any = (
        <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
    )
    if (triviaQuestion.hasResult) {
        titleTags = bottomTags = null;
    }
    return (
        <View style={styles.container}>
            {/* Title */}
            {titleTags}
            {/* Subtitle */}
            {bottomTags}
            {/* Options */}
            <TouchableWithoutFeedback
                onPress={() => { showPurchaseModal(lives) }}
            >
                <View>
                    <Button
                        onPress={() => { onButtonPress(1) }}
                        // light={!buttonsState.button1Pressed}
                        // primary={buttonsState.button1Pressed}
                        disabled={renderDisabled}
                        block
                        large
                        rounded style={[styles.button, buttonStyles(1)]}>
                        <Text style={[styles.buttonText, buttonTextStyles(1)]}>
                            {props.question.option_1}
                        </Text>
                        {buttonAddon(1)}
                    </Button>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onPress={() => { showPurchaseModal(lives) }}
            >
                <View>
                    <Button
                        onPress={() => { onButtonPress(2) }}
                        // light={!buttonsState.button2Pressed}
                        // primary={buttonsState.button2Pressed}
                        disabled={renderDisabled}
                        block
                        large
                        rounded style={[styles.button, buttonStyles(2)]}>
                        <Text style={[styles.buttonText, buttonTextStyles(2)]}>
                            {props.question.option_2}
                        </Text>
                        {buttonAddon(2)}
                    </Button>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onPress={() => { showPurchaseModal(lives) }}
            >
                <View>
                    <Button
                        onPress={() => { onButtonPress(3) }}
                        // light={!buttonsState.button3Pressed}
                        // primary={buttonsState.button3Pressed}
                        disabled={renderDisabled}
                        block
                        large
                        rounded
                        style={[styles.button, buttonStyles(3)]}>
                        <Text style={[styles.buttonText, buttonTextStyles(3)]}>
                            {props.question.option_3}
                        </Text>
                        {buttonAddon(3)}
                    </Button>
                </View>
            </TouchableWithoutFeedback>
            
        </View>
    )

}


export default GameQuestion;
// export default connectStyle('SuperLiga.GameQuestion')(GameQuestion);
