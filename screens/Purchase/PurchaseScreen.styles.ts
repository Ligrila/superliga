import { StyleSheet } from 'react-native';
import { FooterStyle } from '../../Theme/AppTheme';


export default StyleSheet.create({
    webview:{
    },
    header:{
        paddingTop: 20,
        backgroundColor: '#009ee3',
    },
    footer:{
        ...FooterStyle
    }
});