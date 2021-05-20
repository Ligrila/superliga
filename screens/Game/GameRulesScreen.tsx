import React from 'react';
import { WebView } from 'react-native-webview';
import { Container } from 'native-base';
import Enviroment from '../../constants/Enviroment';
import AppHeader from '../../components/AppHeader/AppHeader';
import Wallpaper from '../../components/Wallpaper';


import styles from './GameRulesScreen.styles'
const  bgSrc = require('../../assets/images/blackBg.png');

const INJECTED_JAVASCRIPT = `function () {
  var originalPostMessage = window.postMessage;

  var patchedPostMessage = function (message, targetOrigin, transfer) {
      originalPostMessage(message, targetOrigin, transfer);
  };

  patchedPostMessage.toString = function () {
      return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
  };

  window.postMessage = patchedPostMessage;
};`;

const GameRulesScreen = () => {
  
  const closeWebView = () => {
  }

  const onWebViewMessage = (event) => {
    if (event.nativeEvent.data == 'closeWebView') {
      closeWebView();
    } else {
      console.log("unknow data " + event.nativeEvent.data);
    }
  }




  const url = Enviroment.apiUrl + "/../pages/display/reglas-del-juego?no_header";
  const patchPostMessageJsCode = '(' + String(INJECTED_JAVASCRIPT) + ')();';

  if (!url) {
    return <></>;
  }
  return (
    <Container>

      <Wallpaper source={bgSrc}>

        <AppHeader logo={true}/>

        <WebView
          // ref={component => this.webView = component}
          source={{ uri: url }}
          injectedJavaScript={patchPostMessageJsCode}
          onMessage={onWebViewMessage}
          style={styles.webview}
        />
      </Wallpaper>
    </Container>
  );


}

export default GameRulesScreen;