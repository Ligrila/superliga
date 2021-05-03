import React, { useContext } from "react";
// Native Base
import { Container, Content, Text, Icon, connectStyle } from "native-base";
// Navigation
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useNavigationState } from "@react-navigation/native";

const _SidebarItem = (props) => {
  const styles = props.style;
  const icon = props.icon;
  //<Image source={source} style={styles.sidebarItemImage}></Image>
  if (icon) {
    let itemBullet = null;
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

export const SidebarItem = connectStyle("SuperLiga.Sidebar")(_SidebarItem);

const Sidebar = (props) => {
  // Props
  const { navigation } = props;
  // States of routes
  const stateRoutes = useNavigationState((state) => state);
  // Get Active route state :P a travel (un viaje fue jaja)
  const getActiveRouteState = (route) => {
    if (route) {
      let routes = [];
      let index = 0;
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
  };
  const activeRoute = getActiveRouteState(stateRoutes);
  // Is active
  const isActive = (key, activeRoute) => {
    let active = false;
    if (activeRoute) {
      active = activeRoute.name.includes(key);
    }

    return active;
  };

  return (
    <Container>
      <Content>
        <DrawerContentScrollView {...props}></DrawerContentScrollView>
      </Content>
    </Container>
  );
};

export default Sidebar;
