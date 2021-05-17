import React, { Component } from "react";
import {
    View,
} from "react-native";

import { Text, Spinner } from 'native-base'

import Reflux from 'reflux'

import Layout from '../../constants/Layout';

import TeamAvatar from '../TeamAvatar'


import GamePlay from './GamePlay';
import { TriviaQuestion } from "../../store/TriviaQuestion";

import styles from './Game.styles';
import { useRecoilValue } from "recoil";
import { triviaQuestionAtom } from "../../recoil/TriviaQuestion.recoil";

const Game = ({
    currentTrivia,
    onNoLife,
    setModalVisibleProp
}) => {
    // Trivia Question (?)
    const triviaQuestion = useRecoilValue(triviaQuestionAtom);
    // Render Game Play
    const renderGamePlay = () => {
        return (
            <GamePlay
                onNoLife={onNoLife}
                setModalVisibleProp={setModalVisibleProp} />);
    }

    const onQuestionTimeout = () => {
        //console.log("Question timed out");
    }
    const renderTeams = () => {
        if (currentTrivia.type == 'trivia') {
            return (
                <View style={styles.avatarContainer}>
                    <TeamAvatar source={currentTrivia.visit_team.avatar} width={86} height={98} />
                </View>
                );     
        }
        return (
            <View style={styles.avatarContainer}>
                <TeamAvatar source={currentTrivia.local_team.avatar} width={86} height={98} />
                <Text style={styles.vsText}>vs</Text>
                <TeamAvatar source={currentTrivia.visit_team.avatar} width={86} height={98} />
            </View>);
    }
    const renderTrivia = () => {
        if (triviaQuestion && (triviaQuestion.hasQuestion || triviaQuestion.hasResult)) {
            return null
        }
        if (currentTrivia.type == 'trivia') {
            const title1 = currentTrivia.title1 ? currentTrivia.title1.toUpperCase() : 'TRIVIA';
            const title2 = currentTrivia.title2 ? currentTrivia.title2.toUpperCase() : 'SEMANAL';
            return (
                <View style={styles.programmedTriviaContainer}>
                    <Text style={styles.programmedTriviaText1}>{title1}</Text>
                    <Text style={styles.programmedTriviaText2}>{title2}</Text>
                </View>
            )
        }

        return null;

    }



    if (!currentTrivia.local_team) {
        return (<Spinner />)
    }
    return (
        <View style={styles.container}>
            {renderTeams()}
            {renderTrivia()}
            <View style={styles.mainContainer}>
                {renderGamePlay()}
            </View>
        </View>
    )

}

export default Game;