
import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility';

export default StyleSheet.create({
    container:{

    },
    bigText: {
        fontFamily: 'edosz',
        fontSize: ThemeUtility.s(140),
        transform: [{ rotate: '-10deg' }],
        textAlign: 'center',
        lineHeight: ThemeUtility.s(120),

    },
    button: {
        marginTop: ThemeUtility.s(36),
        height: ThemeUtility.s(115),
    },
    buttonText: {
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(35),
        textAlign: 'center'
    },
    text: {
        fontFamily: 'edosz',
        fontSize: ThemeUtility.s(140),
        transform: [{ rotate: '-10deg' }],
        textAlign: 'center',
        lineHeight: ThemeUtility.s(120),
    },
    subtext: {
        fontSize: ThemeUtility.s(30),
        fontFamily: 'OpenSansCondensed_bold',
        textAlign: 'center'
    },
    subtextBold: {
        fontSize: ThemeUtility.s(35),
        fontFamily: 'OpenSansCondensed_bold',
        textAlign: 'center'
    }
});

