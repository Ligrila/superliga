import React from "react";
import {
    View,
    Image,
} from "react-native";
// Native Base
import {
    Header,
    Body,
    Left,
    Icon,
    Right,
    Button,
    Text
} from 'native-base'
// Drawer
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

import UserInfo from '../UserInfo';
import OfflineNotice from '../OfflineNotice';
import NotificationBullet from "../Notification/NotificationBullet";
// Styles
import styles from './AppHeader.styles';
import Layout from '../../constants/Layout';
// Assets
const superligaAppImg = require('../../assets/images/app_logo.png');
const menuImg = require('../../assets/images/menu.png');

// Props
interface AppHeaderProps {
    hideChat?: boolean;
    game?: boolean;
    return?: React.ReactNode;
}

const AppHeader = (props: AppHeaderProps) => {
    const navigation = useNavigation();
    const renderLeft = () => {
        if (props.game) {
            return (<UserInfo />);
        }
        if (props.return) {
            return props.return;
        }
        // return (<Image source={superligaImg} style={styles.superligaImg} resizeMode="contain" />);
        return null;
    }
    const openMainDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer);
        // if(this.props.navigation){
        //     this.props.navigation.openMainDrawer()
        //     return
        // }
        // if(this.props.drawerOpen){
        //     this.props.drawerOpen()
        // }
    }
    const openChatDrawer = () => {
        // if(this.props.navigation && this.props.navigation.openChatDrawer){
        //     this.props.navigation.openChatDrawer()
        //     return
        // }
    }
    const renderChatButton = () => {

        if (props.hideChat) {
            return null
        }

        return (
            <Button transparent onPress={() => { openChatDrawer() }}>
                <Icon type="Ionicons" name="ios-chatboxes" />
            </Button>
        )
    }


    const heightRatio = Layout.window.heightRatio;
    const marginBottom = props.game ? -50 * heightRatio : 5;
    return (
        <Header transparent style={{ marginBottom: marginBottom, ...styles.header }}>
            <Left style={styles.left}>
                {renderLeft()}
            </Left>
            <Body style={styles.body}>

            </Body>
            <Right style={styles.right}>
                {/* {renderChatButton()} */}
                <Button transparent onPress={() => { openMainDrawer() }}>
                    <Image source={menuImg} style={styles.menuImg} resizeMode="contain" />
                </Button>
                <View style={styles.notificationBullet}>
                    {/* <NotificationBullet /> */}
                </View>
            </Right>
        </Header>
    );

}
export default AppHeader;