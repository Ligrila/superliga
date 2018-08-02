import React, { Component } from "react";
import Reflux from "reflux";
import {
    View,
    Image,
    StyleSheet
} from "react-native";

import { Text } from 'native-base'


import Layout from '../../constants/Layout';
import ballImg from '../../assets/images/ball.png';

import { UsersStore } from "../../store/UserStore";


export default class UserInfo extends Reflux.Component {
    constructor(props){
        super(props);
        this.store = UsersStore;
    }
    render(){
        let points = 0;
        let lives = 0;
        console.log(this.state);
        if(this.state.hasInformation){
            if(this.state.user.life[0]){
                lives = this.state.user.life[0].lives;
            }
            if(this.state.user.points[0]){
                points = this.state.user.points[0].points;
            }
        }
        return(
            <View>
                <Text><Image source={ballImg} style={styles.ballImg} /> {lives}</Text>
                <Text>PUNTOS</Text>
                <Text>{points}</Text>

            </View>
        )
    }
}



const ratio = Layout.window.ratio;

const styles = StyleSheet.create({
    ballImg: {
        width: 31 * ratio,
        height: 31 * ratio,
     },

  });