import React, 
{ 
    Component 

} from "react";
import {
    View,
} from "react-native";


import { connectStyle, Text } from 'native-base';



import Layout from '../../constants/Layout';
import {GameBallCircularProgress} from '../GameBallCircularProgress'


class StatisticItem extends React.Component {
    state = {
        tintColor: "#6adc95"
    }
    constructor(props){
        super(props);
    }
    onBallFill(){}
    onTimeout(){
    }
    render(){
        const ratio = Layout.window.ratio;
        const styles = this.props.style;
        let fill = this.props.fill || 0;
        let duration = 1000;

        return(
                <View style={styles.container}>
                    <GameBallCircularProgress
                            ref={(ref) => this.circularProgress = ref}
                            size={175 * Layout.window.ratio}
                            width={6}
                            duration={duration}
                            fill={fill}
                            backgroundColor="rgba(255,255,255,0.42)"
                            tintColor={this.state.tintColor}
                            animationListener={this.onBallFill}
                            onAnimationComplete={this.onTimeout}
                            >
                                {
                                (fill) => (
                                    <View style={styles.fill}>
                                        <Text style={styles.fillText}> 
                                            {this.props.fillText}
                                        </Text>
                                    </View>
                                )
                            }
                    </GameBallCircularProgress>
                    <Text style={styles.text}>{this.props.text.toUpperCase()}</Text>
                </View>
        )
    }
}



export default connectStyle('SuperLiga.StatisticItem')(StatisticItem);