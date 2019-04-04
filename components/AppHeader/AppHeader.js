import React, { Component } from "react";
import {
    View,
    Image,
    TouchableOpacity,
    Platform,
    StyleSheet
} from "react-native";

import { Header, Body, Container, Title, Content, Left, Icon, Right, Text, Button, connectStyle } from 'native-base'


import UserInfo from '../UserInfo';

import Layout from '../../constants/Layout';


import superligaAppImg from '../../assets/images/app_logo.png';
//import superligaImg from '../../assets/images/logo.png';
import menuImg from '../../assets/images/menu.png';


import OfflineNotice from '../OfflineNotice';
import NotificationBullet from "../Notification/NotificationBullet";



class AppHeader extends Component {
    renderLeft(){
        if(this.props.game){
            return (<UserInfo />);    
        }
        if(this.props.return){
            return this.props.return;
        }
        //return (<Image source={superligaImg} style={styles.superligaImg} resizeMode="contain" />);
        return null;
    }
    render() {
        const styles  = this.props.style;
        const heightRatio = Layout.window.heightRatio;
        const marginBottom = this.props.game ? -50 * heightRatio : 5;
        
        return (
            <Header transparent style={{marginBottom:marginBottom,...styles.header}}>
                <Left style={styles.left}>
                    {this.renderLeft()}
                </Left>
                <Body style={styles.body}>
                        <Image style={styles.superligaAppImg} source={superligaAppImg} resizeMode="contain"  />
                </Body>
                <Right style={styles.right}>
                    <Button transparent onPress={() => {this.props.drawerOpen()}}>
                        <Image source={menuImg} style={styles.menuImg}   resizeMode="contain"/>
                    </Button>
                    <View style={styles.notificationBullet}>
                        <NotificationBullet />
                    </View>
                </Right>
            </Header>
        );
    }
}

export default connectStyle("SuperLiga.AppHeader")(AppHeader);


