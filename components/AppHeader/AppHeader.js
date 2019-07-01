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
import { DrawerActions } from "react-navigation";




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
    openMainDrawer(){
        if(this.props.navigation){
            this.props.navigation.openMainDrawer()
            return
        }
        if(this.props.drawerOpen){
            this.props.drawerOpen()
        }
    }
    openChatDrawer(){
        if(this.props.navigation && this.props.navigation.openChatDrawer){
            this.props.navigation.openChatDrawer()
            return
        }
    }
    renderChatButton(){

        if(this.props.hideChat){
            return null
        }
        if(!this.props.navigation){
            return null;
        }
        return (
        <Button transparent onPress={() => {this.openChatDrawer()}}>
            <Icon type="Ionicons" name="ios-chatboxes" />
        </Button>
        )
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
                    {this.renderChatButton()}
                    <Button transparent onPress={() => {this.openMainDrawer()}}>
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


