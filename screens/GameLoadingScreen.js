
import React from 'react';
import Reflux from 'reflux';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import Api from '../api/Api';

import {NextTriviaStore} from '../store/NextTriviaStore'

export default  class GameLoadingScreen extends Reflux.Component {
  api = new Api();
  constructor(props) {
    super(props);
    this.store = NextTriviaStore; // cambiar por GameStore y chequear ahi

    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    let gameInProgress = false;
    this.props.navigation.navigate(gameInProgress ? 'GamePlay' : 'Home');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});