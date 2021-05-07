import React from 'react';
import { WebView } from 'react-native-webview';
import {
    Container,
    Button,
    Header,
    Body,
    Left,
    Icon,
} from 'native-base';
import { UsersActions } from '../../store/UserStore';

import styles from './PurchaseScreen.styles'

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

const PurchaseScreen = ({ navigation, route }) => {
    // Purchase Url
    const { purchaseUrl } = route.params || { purchaseUrl: null };
    const closeWebView = () => {
        UsersActions.update();
        navigation.goBack();
    }

    const onWebViewMessage = (event) => {
        console.log("Message received from webview ");
        if (event.nativeEvent.data == 'closeWebView') {
            closeWebView();
        } else {
            console.log("unknow data " + event.nativeEvent.data);
        }
    }

    // if (!purchaseUrl) {
    //     console.warn('Error: you must call this screen with a purchase uri');
    //     return <></>;
    // }
    return (
        <Container>
            <Header style={styles.header} noShadow>
                <Left>
                    <Button transparent onPress={closeWebView}>
                        <Icon name='close' type="MaterialIcons" />
                    </Button>
                </Left>
                <Body />
            </Header>
            <WebView
                source={{ uri: purchaseUrl }}
                injectedJavaScript={INJECTED_JAVASCRIPT}
                onMessage={onWebViewMessage}
                style={styles.webview}
            />
        </Container>
    );

}

export default PurchaseScreen;