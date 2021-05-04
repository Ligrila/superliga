import React from 'react';
import {StyleSheet, ImageBackground, ImageSourcePropType, ViewStyle, StyleProp} from 'react-native';

interface WallpaperProps{
    source: ImageSourcePropType,
    children: React.ReactNode,
    styles?: StyleProp<ViewStyle>
}

const  Wallpaper = (props:WallpaperProps)=>{
    return (
      <ImageBackground 
        style={[styles.picture, props.styles ? props.styles : null]} 
        source={props.source} 
        imageStyle={styles.imageStyle}>
        {props.children}
      </ImageBackground>
    );
}
const styles = StyleSheet.create({
  picture: {
    flex: 1,
    width: undefined,
    height: undefined,
    
  },
  imageStyle: {
    resizeMode: 'cover',

  }
});

export default Wallpaper;
