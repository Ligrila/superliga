import React from "react";
// React Native
import { ScrollView, View, Image } from "react-native";
// Native Base
import {
  Container,
  Content,
  Header,
  Text,
  Body,

} from "native-base";
// Navigation
import { DrawerItem } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
// Components
import UserAvatar from "../UserAvatar/UserAvatar";
import Wallpaper from "../Wallpaper/Wallpaper";
// Assets
const bgSrc = require("../../assets/images/sidebar-bg.png");
// Styles 
import styles from './Sidebar.styles';
// Recoil
import { useRecoilValue } from "recoil";
import { authUserAtom } from "../../recoil/Auth.recoil";
import { TouchableOpacity } from "react-native-gesture-handler";


const menuItems = [
  {
    text: 'INICIO',
    route: 'GameLoading',
    image: require('../../assets/images/menu/menu_home.png')
  },
  {
    text: 'MI PERFIL',
    route: 'Profile',
    image: require('../../assets/images/menu/menu_profile.png')
  },
  {
    text: 'FIXTURE',
    route: 'Fixture',
    image: require('../../assets/images/menu/menu_fixture.png')
  },
  {
    text: 'ESTADISTICAS',
    route: 'Statistics',
    image: require('../../assets/images/menu/menu_statistics.png')
  },
  {
    text: 'PREMIOS',
    route: 'Awards',
    image: require('../../assets/images/menu/menu_awards.png')
  },
  {
    text: 'METAS',
    route: 'Goals',
    image: require('../../assets/images/menu/menu_goals.png')
  },
  {
    text: 'COMPRAR',
    route: 'Buy',
    image: require('../../assets/images/menu/menu_buys.png')
  },
  {
    text: 'AJUSTES',
    route: 'Settings',
    image: require('../../assets/images/menu/menu_settings.png')
  },
]

// Sidebar Item
const SidebarItem = ({ menu, navigateTo, last }) => {
  const handleOnPress = () => {
    navigateTo(menu.route);
  }
  return (
    <TouchableOpacity onPress={handleOnPress}
      style={[styles.sidebarItem, last ? { borderBottomWidth: 0 } : null]}>
      <View style={styles.sidebarItemContainer}>
        <View style={styles.sidebarItemImageContainer}>
          <Image source={menu.image}
            style={styles.sidebarItemImage}
          />
        </View>
        <Text style={styles.sidebarItemLabel}>{menu.text}</Text>
      </View>
    </TouchableOpacity>
  )
}
// Sidebar
const Sidebar = (props) => {
  // Recoil
  const authUser = useRecoilValue(authUserAtom);
  // Navigation
  const navigation = useNavigation();

  // Logout
  const onPressLogout = () => {
    navigation.navigate('Auth', {
      screen: 'Logout'
    });
  }
  // Navigate
  const onPressNavigate = (route) => {
    navigation.navigate(route);
  }
  let username = '';
  if (authUser) {
    username = authUser.first_name && authUser.last_name ? `${authUser.first_name} ${authUser.last_name}` : authUser.username
  }

  let points = 0;

  if (authUser && authUser.point) {
    points = authUser.point.points;
  }
  return (
    <Container style={styles.container}>
      <Wallpaper source={bgSrc}>
        <View style={styles.mainContainer}>
          {/* Header */}
          {authUser &&
            <Header transparent style={styles.header}>
              <Body style={styles.headerBody}>
                <Text style={styles.userText}>{username}</Text>
                <Text style={styles.userPoints}>{points} Puntos</Text>
                <View style={styles.userAvatar}>
                  <UserAvatar avatar={authUser.avatar} />
                </View>
              </Body>
            </Header>}
          <Content style={styles.content}>
            <ScrollView style={styles.scrollContainer}>
              {/* <DrawerItemList
              {...props}
              style={styles.drawerItems}
              activeBackgroundColor="transparent"
              itemStyle={styles.sidebarItemStyle}
              labelStyle={styles.sidebarItemLabel}
              activeTintColor={'#fff'}
              inactiveTintColor={'#fff'}
            /> */}
              {menuItems.map((menu, index) => (
                <SidebarItem
                  key={index}
                  menu={menu}
                  last={index === menuItems.length - 1}
                  navigateTo={onPressNavigate}
                />
              ))}
              {/* Logout */}
              {/* <DrawerItem
                activeTintColor={'#fff'}
                inactiveTintColor={'#fff'}
                activeBackgroundColor="transparent"
                // focused={isActive('Profile', activeRoute)}
                label="Salir"
                onPress={onPressLogout}
              /> */}
            </ScrollView>
          </Content>
        </View>
      </Wallpaper>
    </Container>
  );
};

export default Sidebar;
