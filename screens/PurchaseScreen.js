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

    closeWebView(){
      console.log("Close web view");
    }
  
    onWebViewMessage = (event) =>{
      console.log("Message received from webview ");
      if(event.nativeEvent.data=='closeWebView'){
        // close
        this.props.navigation.goBack();
      } else{
        console.log("unknow data " + event.nativeEvent.data);
      }


  
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
            onMessage={this.onWebViewMessage}
          />
        </Container>
      );
    }
  
  }

