import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { Text } from "native-base";

import { useRecoilValue } from "recoil";
import { authUserAtom } from "../../recoil/Auth.recoil";

import styles from './NotificationBullet.style'
interface NotificationBulletProps {
  style?: StyleProp<ViewStyle>
}
const NotificationBullet = (props: NotificationBulletProps) => {
  const authUser = useRecoilValue(authUserAtom);

  if (authUser.unreaded_notifications_count <= 0) {
    return null;
  }


  return (
    <View style={[styles.container, props.style ? props.style : null]}>
      <Text style={styles.text}>{authUser.unreaded_notifications_count} </Text>
    </View>
  );
};

export default NotificationBullet;
