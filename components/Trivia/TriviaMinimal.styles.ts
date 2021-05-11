import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility';
import Variables from '../../styles/Variables';


export default StyleSheet.create({
    avatarContainer: {
        //flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
    },
    vsText: {
        marginLeft: 8,
        marginRight: 8,
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(40),
    },
    programmedTriviaTextContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    programmedTriviaText1: {
        fontFamily: 'AbadiMTCondensedExtraBold',
        fontSize: ThemeUtility.h(60),
        lineHeight: ThemeUtility.h(68),
        color: '#fff',
        textAlign: 'center',
    },
    programmedTriviaText2: {
        fontFamily: 'AbadiMTCondensedExtraBold',
        color: '#fff',
        fontSize: ThemeUtility.h(100),
        lineHeight: ThemeUtility.h(120),
        textAlign: 'center',
        marginBottom: ThemeUtility.h(-20)

    },


});

