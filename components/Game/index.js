import React, { Component } from "react";
import {
    View,
} from "react-native";

import { connectStyle, Text, Spinner } from 'native-base'

import Reflux from 'reflux'

import Layout from '../../constants/Layout';

import TeamAvatar from '../TeamAvatar'


import GamePlay from './GamePlay';
import { TriviaQuestion } from "../../store/TriviaQuestion";


/**
 * 
 */

class Game extends Reflux.Component {
    constructor(props){
        super(props);
        this.store = TriviaQuestion
    }

    renderGamePlay(){
        return (<GamePlay navigation={this.props.navigation} onNoLife={this.props.onNoLife} setModalVisibleProp={this.setModalVisibleProp}/>);
    }

    onQuestionTimeout(){
        //console.log("Question timed out");
    }

    renderTeams = () => {
        if(this.state.hasQuestion || this.state.hasResult ){
            return null
        }
        const styles = this.props.style;
        if(this.props.currentTrivia.type=='trivia'){
            const title1 = this.props.currentTrivia.title1 ? this.props.currentTrivia.title1.toUpperCase() : 'TRIVIA';
            const title2 = this.props.currentTrivia.title2 ? this.props.currentTrivia.title2.toUpperCase() : 'SEMANAL';
            return (
                <View style={styles.programmedTriviaContainer}>    
                    <Text style={styles.programmedTriviaText1}>{title1}</Text>
                    <Text style={styles.programmedTriviaText2}>{title2}</Text>
                </View>
                )
        }
        return (<View style={styles.avatarContainer}>
            <TeamAvatar source={this.props.currentTrivia.local_team.avatar} width={86} height={98} />
            <Text style={styles.vsText}>vs</Text>
            <TeamAvatar source={this.props.currentTrivia.visit_team.avatar}  width={86} height={98} />    
        </View>);
    }

    render(){
        const ratio = Layout.window.ratio;
        const styles = this.props.style;
        if(!this.props.currentTrivia.local_team){
            return (<Spinner />)
        }
        return(
                <View style={styles.container}>
                    {this.renderTeams()}
                    <View style={styles.mainContainer}>
                        {this.renderGamePlay()}
                    </View>
                </View>
        )
    }
}




export default connectStyle('SuperLiga.Game')(Game);