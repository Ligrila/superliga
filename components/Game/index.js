import React, { Component } from "react";
import {
    View,
    Image,
    Animated,
    Easing,
    StyleSheet,
} from "react-native";

import { Text } from 'native-base'


import Layout from '../../constants/Layout';

import TeamAvatar from '../TeamAvatar'


import GameWait from './GameWait';
import {GameBallCircularProgress} from '../GameBallCircularProgress'

import ballImg from '../../assets/images/ball.png';

/**
 * 
 */

export default class Game extends Component {
    constructor(props){
        super(props);
        console.log(props);
    }

    renderGamePlay(){
        return (<GameWait />);
    }

    render(){
        const ratio = Layout.window.ratio;
        return(
                <View style={styles.container}>
                    <View style={styles.avatarContainer}>
                            <TeamAvatar source={this.props.currentTrivia.data.local_team.avatar} width={86} height={98} />
                            <Text style={styles.vsText}>vs</Text>
                            <TeamAvatar source={this.props.currentTrivia.data.visit_team.avatar}  width={86} height={98} />
                        </View>
                    <View style={styles.ballContainer}>
                        <GameBallCircularProgress
                        size={175 * Layout.window.ratio}
                        width={9}
                        fill={100}
                        tintColor="rgba(255,255,255,0.42)"
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                        >
                        {
                            (fill) => (
                                <Animated.Image source={ballImg}  style={styles.ballImg}/> 
                            )
                        }
                        </GameBallCircularProgress>
                    </View>
                    {this.renderGamePlay()}
                </View>
        )
    }
}



const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    vsText:{
        marginLeft: 8,
        marginRight: 8
    },
    ballContainer:{
        alignItems: 'center'
    },
    ballImg:{
        width:150 * Layout.window.ratio,
        height: 150 * Layout.window.ratio,

    },
    avatarContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})