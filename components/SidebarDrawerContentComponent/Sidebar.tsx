import React from "react";
// React Native
import { ScrollView, View } from "react-native";
// Native Base
import {
  Container,
  Content,
  Header,
  Text,
  Body,
  Icon
} from "native-base";
// Navigation
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useNavigation, useNavigationState, } from "@react-navigation/native";
// Components
import Wallpaper from "../Wallpaper/Wallpaper";
import UserAvatar from "../UserAvatar/UserAvatar";
// Assets
const bgSrc = require("../../assets/images/sidebar_bg.png");
// Styles 
import styles from './Sidebar.styles';
import Layout from '../../constants/Layout';
import { useRecoilValue } from "recoil";
import { authUserAtom } from "../../recoil/atoms/Auth.atom";
// Item
export const SidebarItem = (props) => {
  const styles = props.style;
  const icon = props.icon;
  //<Image source={source} style={styles.sidebarItemImage}></Image>
  if (icon) {
    let itemBullet: any = null;
    if (props.bullet) {
      itemBullet = (
        <View
          style={{
            position: "absolute",
            top: Layout.s(36),
            right: Layout.s(60),
          }}
        >
          {props.bullet}
        </View>
      );
    }
    return (
      <View style={styles.sidebarItemStyle}>
        <Icon type="FontAwesome" name={icon} style={styles.sidebarItemIcon} />
        <Text style={styles.sidebarItemLabel}>{props.label.toUpperCase()}</Text>
        {itemBullet}
      </View>
    );
  }
  return (
    <View>
      <Text style={styles.sidebarItemLabel}>{props.label}</Text>
    </View>
  );
};


// Sidebar
const Sidebar = (props) => {
  // Recoil
  const authUser = useRecoilValue(authUserAtom);
  // Navigation
  const navigation = useNavigation();
  // States of routes
  const stateRoutes: any = useNavigationState(state => state)
  // Get Active route state :P a travel (un viaje fue jaja)
  const getActiveRouteState = (route: any) => {
    if (route) {
      let routes = [];
      let index = 0
      if (route.state) {
        routes = route.state.routes ? route.state.routes : [];
        index = route.state.index ? route.state.index : 0;
      } else {
        routes = route.routes ? route.routes : [];
        index = route.index ? route.index : 0;
      }

      if (!routes || routes.length === 0 || index >= routes.length) {
        return route;
      }
      const childActiveRoute = routes[index];
      return getActiveRouteState(childActiveRoute);
    }
  }
  const activeRoute = getActiveRouteState(stateRoutes)
  // Is active
  const isActive = (key, activeRoute) => {
    let active = false;
    if (activeRoute) {
      active = activeRoute.name.includes(key);
    }

    return active;
  }
  let points = 0;
  if (authUser && authUser.point) {
    points = authUser.point.points;
  }
  const onPressLogout = () => {
    navigation.navigate('Auth', {
      screen: 'Logout'
    });
  }
  return (
    <Container style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {authUser && <Header transparent style={styles.header}>
          <Body style={styles.headerBody}>
            <Text style={styles.userText}>{authUser.username}</Text>
            <Text style={styles.userPoints}>{points} Puntos</Text>
            <View style={styles.userAvatar}>
              <UserAvatar avatar={authUser.avatar} />
            </View>
          </Body>
        </Header>}
        <Content padder style={styles.content}>
          <DrawerContentScrollView {...props}>
            <DrawerItemList
              {...props}
              style={styles.drawerItems}
              activeBackgroundColor="transparent"
              itemStyle={styles.sidebarItemStyle}
              labelStyle={styles.sidebarItemLabel}
              activeTintColor={'#fff'}
              inactiveTintColor={'#fff'}
            />
            <DrawerItem
              activeTintColor={'#fff'}
              inactiveTintColor={'#fff'}
              activeBackgroundColor="transparent"
              // focused={isActive('Profile', activeRoute)}
              label="Salir"
              onPress={onPressLogout}
            />
          </DrawerContentScrollView>
        </Content>
      </ScrollView>
    </Container>
  );
};

export default Sidebar;
