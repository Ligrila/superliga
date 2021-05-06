import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility';

export default StyleSheet.create({
    container:{
        alignItems: 'center',
        marginBottom: ThemeUtility.h(27),
    },
    title: {
        textAlign: 'center',
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(50),
    },
    separator: {
        backgroundColor: 'white',
        height: ThemeUtility.h(68),
        width: 1,
        marginTop: ThemeUtility.h(27),
        marginBottom: ThemeUtility.h(27),

    },
});

