import React, { Component } from "react";
import {
    View,
    StyleSheet,
} from "react-native";

import { Text } from 'native-base'


import Layout from '../../constants/Layout';


/**
 * 
 */

export default class GameWait extends Component {
    render(){
        const ratio = Layout.window.ratio;
        return(
                <View style={styles.container}>
                </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})