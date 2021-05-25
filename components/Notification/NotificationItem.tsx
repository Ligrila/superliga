import React from "react";

import { View, TouchableOpacity } from "react-native";
import { Text } from "native-base";
import { useNavigation } from "@react-navigation/native";

import styles from './NotificationItem.styles';
import { GAME_ROUTES_STRING } from "../../new-navigation/GameNavigator";
import { CHAMPIONSHIP_ROUTES_STRING } from "../../new-navigation/ChampionshipNavigator";
import { CHALLELNGES_ROUTES_STRING } from "../../new-navigation/ChallengeNavigator";
import NotificationUtility from "../../utilities/Notification/Notification.utility";

const NotificationItem = ({ notification, colorIndex }) => {

  const navigation = useNavigation();

  const renderDate = () => {
    const dateParts = notification.created.split(" ")[0].split("-");
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];

    return `${day}.${month}.${year}`;
  }
  const onPress = () => {

    if (notification.data.navigate) {
      const route = notification.data.navigate
      const params = notification.data.params || null
      // Navigate
      NotificationUtility.navigateTo(route, params);
    }
  };
  const variant = colorIndex % 2 === 0;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.container,
          variant ? styles.containerVariant : null,
        ]}
      >
        <View style={styles.body}>
          <Text style={styles.text}>{notification.body}</Text>
          <Text style={styles.dateText}>{renderDate()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

}

export default NotificationItem;
