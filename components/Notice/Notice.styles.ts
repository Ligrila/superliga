import { StyleSheet } from 'react-native';
import { Variables } from '../../styles';
import ThemeUtility from '../../utilities/Theme/Theme.utility'

export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    arrow: {
        width: 30,
        height: 10,
        marginBottom: -1
    },
    background: {
        width: ThemeUtility.s(562),
        minHeight: ThemeUtility.s(176),
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#1d1d1b'
    },
    text: {
        textAlign: 'center',
        color: '#a6f3ff',
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(40),

    }
});