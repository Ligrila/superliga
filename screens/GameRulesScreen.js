import React from 'react';
import {
    WebView
  } from 'react-native';

import { Container,connectStyle, Button, Header, Body, Left, Title, Icon, Content } from 'native-base';
import { UsersActions } from '../store/UserStore';
import Enviroment from '../constants/Enviroment';
import AppHeader from '../components/AppHeader/AppHeader';
import bgSrc from '../assets/images/blackBg.png';
import Wallpaper from '../components/Wallpaper';





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

class GameRulesScreen extends React.Component {
    static navigationOptions = {
      title: 'Reglas del juego',
    };

    componentDidMount() {
    }

    closeWebView = ()=>{
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
      const url = Enviroment.apiUrl + "/../pages/display/reglas-del-juego?no_header";

      const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';

      if(!url){
        return;
      }
      const styles = this.props.style;
      return (
        <Container>
                      
            <Wallpaper source={bgSrc}>

            <AppHeader navigation={this.props.navigation} drawerOpen={() => {this.props.navigation.openDrawer()}} />

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

export default connectStyle('SuperLiga.BrowserScreen')(GameRulesScreen)