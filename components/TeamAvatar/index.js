import React, { Component } from "react";
import {
    Image
} from "react-native";



import Layout from '../../constants/Layout';


export default class TeamAvatar extends Component {

    render(){
        const ratio = Layout.window.ratio;
        return(
                <Image source={{uri:this.props.source}} style={{width:this.props.width * ratio,height:this.props.height * ratio}} />
        )
    }
}

