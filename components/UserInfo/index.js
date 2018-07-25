import React, { Component } from "react";
import {
    View,
    Image,
    StyleSheet
} from "react-native";

import { Text } from 'native-base'


import Layout from '../../constants/Layout';
import ballImg from '../../assets/images/ball.png';


export default class UserInfo extends Component {

    render(){
        return(
            <View>
                <Text><Image source={ballImg} style={styles.ballImg} /> 18</Text>
                <Text>PUNTOS</Text>
                <Text>7550</Text>

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