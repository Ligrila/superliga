import React from 'react';
import {
    WebView
  } from 'react-native';

import { Container,connectStyle, Button, Header, Body, Left, Title, Icon, Content } from 'native-base';
import { UsersActions } from '../store/UserStore';


const patchPostMessageFunction = function() {
  var originalPostMessage = window.postMessage;

  var patchedPostMessage = function(message, targetOrigin, transfer) { 
    originalPostMessage(message, targetOrigin, transfer);
  };

  patchedPostMessage.toString = function() { 
    return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
  };

  window.postMessage = patchedPostMessage;
};

class PurchaseScreen extends React.Component {
    static navigationOptions = {
      title: 'Comprar',
    };

    componentDidMount() {
    }

    closeWebView = ()=>{
      UsersActions.update();
      this.props.navigation.goBack();
    }
  
    onWebViewMessage = (event) =>{
      console.log("Message received from webview ");
      if(event.nativeEvent.data=='closeWebView'){
        this.closeWebView();
      } else{
        console.log("unknow data " + event.nativeEvent.data);
      }


  
    }



    render() {
      const { navigation } = this.props;
      const purchaseUrl = navigation.getParam('purchaseUrl', false);

      const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';

      if(!purchaseUrl){
        consle.warn('Error: you must call this screen with a purchase uri');
        return;
      }
      const styles = this.props.style;
      console.log(styles);
      return (
        <Container>
            <Header style={styles.header} noShadow>
            <Left>
              <Button transparent onPress={this.closeWebView}>
                <Icon name='close' type="MaterialIcons" />
              </Button>
            </Left>
            <Body />
          </Header>
            <WebView
             ref={component => this.webView = component}
              source={{uri: purchaseUrl}}
              injectedJavaScript={patchPostMessageJsCode}
              onMessage={this.onWebViewMessage}
              style={styles.webview}
            />
        </Container>
      );
    }
  
  }

export default connectStyle('SuperLiga.PurchaseScreen')(PurchaseScreen)