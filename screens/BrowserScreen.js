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

class BrowserScreen extends React.Component {
    static navigationOptions = {
      title: 'SuperLiga',
    };

    componentDidMount() {
    }

    closeWebView = ()=>{
      this.props.navigation.navigate(this.props.navigation.getParam('return','Login'));
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
      const url = navigation.getParam('url', false);

      const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';

      if(!url){
        return;
      }
      const styles = this.props.style;

      return (
        <Container>
            <WebView
             ref={component => this.webView = component}
              source={{uri: url}}
              injectedJavaScript={patchPostMessageJsCode}
              onMessage={this.onWebViewMessage}
              style={styles.webview}
            />
        </Container>
      );
    }
  
  }

export default connectStyle('SuperLiga.BrowserScreen')(BrowserScreen)