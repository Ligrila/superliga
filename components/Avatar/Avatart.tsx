import React from "react";
import { View, Image } from "react-native";

import styles from './Avatar.styles';
interface AvatarProps{
  mini?:boolean,
  medium?:boolean,
  alternateBorder?: boolean,
  avatar: any,
}

const  Avatar = (props:AvatarProps) => {
  
    if (props.mini) {
      return (
        <View style={styles.container}>
          <View style={styles.avatarMiniContainer}>
            <Image style={styles.avatarMini} source={props.avatar} />
          </View>
        </View>
      );
    }
    if (props.medium) {
      let avatarMediumContainer = styles.avatarMediumContainer;
      if (props.alternateBorder) {
        avatarMediumContainer = {
          ...avatarMediumContainer,
          ...styles.alternateBorder,
        };
      }
      return (
        <View style={styles.container}>
          <View style={avatarMediumContainer}>
            <Image style={styles.avatarMedium} source={props.avatar} />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={props.avatar} />
        </View>
      </View>
    );
  }


export default Avatar;
// connectStyle("SuperLiga.Avatar")(Avatar);
