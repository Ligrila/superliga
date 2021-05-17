import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility';


export default StyleSheet.create({
    container: {
        flex: 1,
    },
    textContainer: {
        marginTop: ThemeUtility.h(50),
        alignItems:'center',
        justifyContent: 'center',
    },
    textLine1: {
        fontFamily: 'OpenSansCondensed_bold',
        transform: [{ rotate: '-5deg'}],
        textAlign: 'center',
        fontSize: ThemeUtility.s(261),
        marginBottom: ThemeUtility.s(-80),
        marginHorizontal: (-70)
    },
    textLine2: {
        fontFamily: 'OpenSansCondensed_bold',
        transform: [{ rotate: '-5deg'}],
        textAlign: 'center',
        fontSize: ThemeUtility.s(261),
        marginBottom: ThemeUtility.s(-80),
    },
    textLine3: {
        fontFamily: 'OpenSansCondensed_bold',
        transform: [{ rotate: '-5deg'}],
        textAlign: 'right',
        width:"100%",

        fontSize: ThemeUtility.s(85),
    }
});