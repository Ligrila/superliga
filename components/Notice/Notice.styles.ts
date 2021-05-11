import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility'

export default StyleSheet.create({
    container:{
        justifyContent:  'center',
        alignItems: 'center',   
    },
    background: {
        width: ThemeUtility.s(562),
        height: ThemeUtility.s(176),
        justifyContent:  'center',
        alignItems: 'center'
    },
    text:{
        textAlign: 'center',
        color: '#a6f3ff',
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(40),

    }
});