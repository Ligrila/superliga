import React, { Component } from "react";
import {
    View,
} from "react-native";

import { connectStyle, Text, Spinner } from 'native-base'


import Layout from '../../constants/Layout';

import TeamAvatar from '../TeamAvatar'


import GamePlay from './GamePlay';


/**
 * 
 */

class Game extends Component {
    constructor(props){
        super(props);
    }

    renderGamePlay(){
        return (<GamePlay navigation={this.props.navigation} onNoLife={this.props.onNoLife} setModalVisibleProp={this.setModalVisibleProp}/>);
    }

    onQuestionTimeout(){
        //console.log("Question timed out");
    }

    render(){
        const ratio = Layout.window.ratio;
        const styles = this.props.style;
        if(!this.props.currentTrivia.local_team){
            return (<Spinner />)
        }
        return(
                <View style={styles.container}>
                    <View style={styles.avatarContainer}>
                            <TeamAvatar source={this.props.currentTrivia.local_team.avatar} width={86} height={98} />
                            <Text style={styles.vsText}>vs</Text>
                            <TeamAvatar source={this.props.currentTrivia.visit_team.avatar}  width={86} height={98} />
                        </View>
                    <View style={styles.mainContainer}>
                        {this.renderGamePlay()}
                    </View>
                </View>
        )
    }
}




export default connectStyle('SuperLiga.Game')(Game);