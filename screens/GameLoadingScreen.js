
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
    let ct = await this.api.getCurrentTrivia();
    if(!ct){
      ct = {success: false};
    }

    let gameInProgress = ct.success;
    this.props.navigation.navigate('StartFirstTime',{trivia:ct.data});return;

    this.props.navigation.navigate(gameInProgress ? 'GamePlay' : 'Home');
    // test this.props.navigation.navigate('Purchase',{purchaseUrl: 'http://172.16.10.22/superliga/payments/back_url'});
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
    backgroundColor: '#000',
  }
});