import React from 'react';
import {
    WebView,
    View
  } from 'react-native';

import { Container,connectStyle, Button,  Icon } from 'native-base';



import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';

import bgSrc from '../assets/images/home_bg.png';




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

class InAppBrowserScreen extends React.Component {
    static navigationOptions = {
      title: 'SuperLiga',
    };

    componentDidMount() {
    }

    closeWebView = ()=>{
      this.props.navigation.navigate(this.props.navigation.getParam('return','Home'));
    }
  
    onWebViewMessage = (event) =>{
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
      const returnButton = (<Button transparent onPress={()=>{
        this.closeWebView()
      }}><Icon name='ios-arrow-back' /></Button>)

      const styles = this.props.style;
      return (
        <Container style={styles.container} contentContainerStyle={styles.container}>
            <Wallpaper source={bgSrc}>
            <AppHeader drawerOpen={() => {this.props.navigation.openDrawer()}} return={returnButton} />
            <WebView
             ref={component => this.webView = component}
              source={{uri: url}}
              injectedJavaScript={patchPostMessageJsCode}
              onMessage={this.onWebViewMessage}
              style={styles.webview}
            />
            </Wallpaper>
        </Container>
      );
    }
  
  }

export default connectStyle('SuperLiga.InAppBrowserScreen')(InAppBrowserScreen)