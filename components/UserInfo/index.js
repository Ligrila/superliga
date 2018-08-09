import React, { Component } from "react";
import Reflux from "reflux";
import {
    View,
    Image,
} from "react-native";

import {connectStyle, Text } from 'native-base'


import ballImg from '../../assets/images/ball.png';

import { UsersStore } from "../../store/UserStore";


class UserInfo extends Reflux.Component {
    constructor(props){
        super(props);
        this.store = UsersStore;
    }
    render(){
        let points = 0;
        let lives = 0;
        const styles = this.props.style;
        if(this.state.hasInformation){
            if(this.state.user.life){
                lives = this.state.user.life.lives;
            }
            if(this.state.user.point){
                points = this.state.user.point.points;
            }
        }
        return(
            <View style={styles.container}>
                <View style={styles.liveContainer}>
                    <Image source={ballImg} style={styles.ballImg} /> 
                    <Text style={styles.livesText}>{lives}</Text>
                </View>
                <Text style={styles.pointsText}>PUNTOS</Text>
                <Text style={styles.pointsValueText}>{points}</Text>

            </View>
        )
    }
}




export default connectStyle('SuperLiga.UserInfo')(UserInfo);