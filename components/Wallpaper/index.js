import React, {Component} from 'react';
import {StyleSheet, ImageBackground} from 'react-native';

export default class Wallpaper extends Component {
  render() {
    return (
      <ImageBackground style={styles.picture} source={this.props.source} imageStyle={styles.imageStyle}>
        {this.props.children}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    width: null,
     height: null,
    
  },
  imageStyle: {
    resizeMode: 'cover',

  }
});


