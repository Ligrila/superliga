import React from 'react';
import {
    AsyncStorage,
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
        await AsyncStorage.removeItem('user');
        await UsersActions.reset();
        this.props.navigation.navigate('Login');
    }
  
    render() {
      return null;
      
    }
  
  }

