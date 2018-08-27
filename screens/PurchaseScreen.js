import React from 'react';
import {
    WebView
  } from 'react-native';
import Enviroment from '../constants/Enviroment';
import { Container } from 'native-base';

export default class PurchaseScreen extends React.Component {
    static navigationOptions = {
      title: 'Comprar',
    };

    componentDidMount() {
    }
  
    render() {
      const { navigation } = this.props;
      const purchaseUrl = navigation.getParam('purchaseUrl', false);
      if(!purchaseUrl){
        consle.warn('Error: you must call this screen with a purchase uri');
        return;
      }

      return (
        <Container>
          <WebView
            source={{uri: purchaseUrl}}
          />
        </Container>
      );
    }
  
  }

