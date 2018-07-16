import React from 'react';
import {
    View,
    StyleSheet,
    AsyncStorage,
    Button
  } from 'react-native';

export default class LogoutScreen extends React.Component {
    static navigationOptions = {
      title: 'Logout',
    };

    componentDidMount() {
        AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('Login');
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