
import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import Api from '../api/Api';
import { UsersActions } from '../store/UserStore';

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
      console.log({userToken})
      const tokenExpire = await AsyncStorage.getItem('tokenExpire');
      let timestamp = new Date().getTime();
      let notExpired = tokenExpire > timestamp;
      isLogin = userToken && (tokenExpire !== null && notExpired);
      if(isLogin){
        // TODO: reveer esto, buscar una forma de detectar logouts en los request
        const user  = await this.api.getUserInformation();
        if(!user){
          isLogin = false;
        }
        if(!user.success){
          isLogin = false;
        }
      }
    } catch(e){
      //console.log(e);
    }
    UsersActions.isLoggedIn(isLogin);

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