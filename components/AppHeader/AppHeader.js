import React, { Component } from "react";
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet
} from "react-native";

import { Header, Body, Title, Content, Left, Icon, Right, Text } from 'native-base'


import UserInfo from '../UserInfo';

import Layout from '../../constants/Layout';


import superligaAppImg from '../../assets/images/app_logo.png';
import superligaImg from '../../assets/images/logo.png';
import menuImg from '../../assets/images/menu.png';



class AppHeader extends Component {
    renderLeft(){
        if(this.props.game){
            return (<UserInfo />);    
        }
        return (<Image source={superligaImg} style={styles.superligaImg} resizeMode="contain" />);
    }
    render() {
        return (
            <Header transparent style={styles.header}>
                <Left style={styles.left}>
                    {this.renderLeft()}
                </Left>
                <Body style={styles.body}>
                    <Title  style={styles.title}>
                        <Image style={styles.superligaAppImg} source={superligaAppImg} resizeMode="contain"  />
                    </Title>
                </Body>
                <Right style={styles.right}>
                    <TouchableOpacity onPress={() => {this.props.drawerOpen()}}>
                        <Image source={menuImg} style={styles.menuImg}   resizeMode="contain"/>
                    </TouchableOpacity>
                </Right>

            </Header>
        );
    }
}
export default AppHeader;


const widthRatio = Layout.window.ratio;

const styles = StyleSheet.create({
    header: {
        //paddingTop:0,
        height: 'auto',
    
    },
    left:{
    },
    body:{
    },
    right:{
    },
    title:{
    },
    superligaAppImg: {
        width: 181 * widthRatio,
        height: 133 * widthRatio,
     },
    menuImg:{
        width: 61 * widthRatio,
        height: 26 * widthRatio,
    },
    superligaImg: {
        width: 65 * widthRatio,
        height: 65 * widthRatio,
    },
  });