import React from "react";
import {
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
} from 'native-base'
// Drawer
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

import UserInfo from '../UserInfo/UserInfo';
// import OfflineNotice from '../OfflineNotice';
// import NotificationBullet from "../Notification/NotificationBullet";
// Styles
import styles from './AppHeader.styles';
import Logo from "../Logo/Logo";
// Assets
const superligaAppImg = require('../../assets/images/app_logo.png');
const menuImg = require('../../assets/images/menu.png');

// Props
interface AppHeaderProps {
    hideChat?: boolean;
    game?: boolean;
    return?: React.ReactNode;
    logo?: boolean,
    logoDisablePress?: boolean
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
    }
 
    
    return (
        <Header transparent style={[styles.header]}>
            <Left style={styles.left}>
                {renderLeft()}
            </Left>
            <Body style={styles.body}>
                {props.logo && <Logo 
                    disablePress={props.logoDisablePress} 
                    game={props.game}
                    />}
            </Body>
            <Right style={styles.right}>
                {/* {renderChatButton()} */}
                <Button transparent onPress={() => { openMainDrawer() }}>
                    <Image source={menuImg} style={styles.menuImg} resizeMode="contain" />
                </Button>
            </Right>
        </Header>
    );

}
export default AppHeader;