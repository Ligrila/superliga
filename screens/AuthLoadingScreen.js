
import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import Api from '../api/Api';

export default  class AuthLoadingScreen extends React.Component {
  api = new Api();
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    let isLogin = false;
    try{
      const userToken = await AsyncStorage.getItem('token');
      const tokenExpire = await AsyncStorage.getItem('tokenExpire');
      let timestamp = new Date().getTime();
      let notExpired = tokenExpire > timestamp;
      console.log("Not expired: " + notExpired);
      let response = await this.api.getTrivias()
      console.log(response);
      isLogin = userToken && (tokenExpire !== null && notExpired);
    } catch(e){
      console.log(e);
    }

    this.props.navigation.navigate(isLogin ? 'Main' : 'Auth');
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