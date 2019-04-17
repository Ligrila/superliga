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

    async componentDidMount() {
        await AsyncStorage.removeItem('refreshToken');
        await  AsyncStorage.removeItem('tokenExpire');
        await AsyncStorage.removeItem('token');
        await UsersActions.reset();
        this.props.navigation.navigate('Login');
    }
  
    render() {
      return null;
      
    }
  
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    }
  });