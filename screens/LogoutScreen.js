import React from 'react';
import {
    View,
    StyleSheet,
    AsyncStorage,
    Button
  } from 'react-native';
import { UsersActions } from '../store/UserStore';

export default class LogoutScreen extends React.Component {
    static navigationOptions = {
      title: 'Logout',
    };

    componentDidMount() {
        AsyncStorage.removeItem('refreshToken');
        AsyncStorage.removeItem('tokenExpire');
        AsyncStorage.removeItem('token').then(
          () => this.props.navigation.navigate('Login2')
        );
        UsersActions.reset();
    }
  
    render() {
      return (
        <View style={styles.container}>

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