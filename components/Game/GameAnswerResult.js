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

class GameAnswerResult extends Component {
    state={
        ok: false
    }
    render(){
        const styles = this.props.style;
        if(this.state.ok){
            return(
                    <View style={styles.container}>
                        <Text style={styles.text}>Muy {"\n"}<Text style={styles.bigText}>Bien!</Text></Text>
                        <Text style={styles.subtext}>RESPUESTA {"\n"}CORRECTA</Text>
                    </View>
            )
        }

        return(
            <View style={styles.container}>
                <Text style={styles.text}>Estas {"\n"}<Text style={styles.bigText}>fuera!</Text></Text>
                <Text style={styles.subtext}>RESPUESTA {"\n"}INCORRECTA</Text>
            </View>
    )
    }
}



export default connectStyle('SuperLiga.GameAnswerResult')(GameAnswerResult);
