import React, { Component } from "react";
import {
    View
} from "react-native";

import { Text } from 'native-base'
import { connectStyle } from 'native-base';



import Layout from '../../constants/Layout';


/**
 * 
 */

class GameWait extends Component {
    render(){
        const ratio = Layout.window.ratio;
        const styles = this.props.style;
        return(
                <View style={styles.container}>
                    <Text style={styles.text}>{this.props.text}</Text>
                </View>
        )
    }
}



export default connectStyle('SuperLiga.GameWait')(GameWait);
