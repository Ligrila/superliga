import React, { Component } from "react";
import {
    View
} from "react-native";

import { Text, Button } from 'native-base'
import { connectStyle } from 'native-base';



import Layout from '../../constants/Layout';


/**
 * 
 */

class GameQuestion extends Component {
    constructor(props){
        super(props);
        this._optionButton1 = this._optionButton2 = this._optionButton3= null;
    }
    onButton1Press(){

    }
    onButton2Press(){
        
    }
    onButton3Press(){
        
    }
    render(){
        const styles = this.props.style;
        return(
                <View style={styles.container}>
                    <Text style={styles.text}>{this.props.question.question}</Text>
                    <Button 
                        onPress={this.onButton1Press}
                        ref={component => this._optionButton1 = component}
                        disabled block light large rounded style={styles.button}>
                        <Text style={styles.buttonText}>{this.props.question.option_1}</Text>
                    </Button>
                    <Button
                        onPress={this.onButton2Press}
                        ref={component => this._optionButton2 = component}
                        block light large rounded style={styles.button}>
                        <Text style={styles.buttonText}>{this.props.question.option_2}</Text>
                    </Button>
                    <Button
                        onPress={this.onButton3Press} 
                        ref={component => this._optionButton3 = component}
                        block light large rounded style={styles.button}>
                        <Text style={styles.buttonText}>{this.props.question.option_3}</Text>
                    </Button>
                </View>
        )
    }
}



export default connectStyle('SuperLiga.GameQuestion')(GameQuestion);
