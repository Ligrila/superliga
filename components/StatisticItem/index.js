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
        tintColor: "#a97bcd"
    }
    constructor(props){
        super(props);
    }
    componentDidMount(){
        
        if(this.props.type=='trivia'){
            this.setState({tintColor:'#4fc0fa'})
        }
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
                            width={20 * Layout.window.ratio}
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
