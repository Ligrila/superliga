import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility';

export default StyleSheet.create({
    container:{
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontFamily: 'OpenSansCondensed_light',
        fontSize: ThemeUtility.s(50),
        marginBottom:0,
    },
    bigTitle:{
        textAlign: 'center',
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(80),
        marginBottom:0,
    },
    red:{
        color: '#fe6c61',
        textAlign: 'center',
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(80),
    },
    subtitle: {
        textAlign: 'center',
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(40),
        marginTop:-8,
    },
    separator: {
        backgroundColor: 'white',
        height: ThemeUtility.h(68),
        width: 1,
        marginTop: ThemeUtility.h(27),
        marginBottom: ThemeUtility.h(27),

    },
});

