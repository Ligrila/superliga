import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility';

export default StyleSheet.create({
    container:{
        flex:1,
        marginTop: 0
    },

    mainContainer:{
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: "100%",
    },
    avatarContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    vsText:{
        marginLeft: 8,
        marginRight: 8
    },
    programmedTriviaContainer:{
        flexDirection: 'column',
    },
    programmedTriviaText1:{
        fontFamily: 'AbadiMTCondensedExtraBold',
        fontSize: ThemeUtility.h(35),
        lineHeight: ThemeUtility.h(65),
        color: '#fff',
        textAlign:'center',
    },
    programmedTriviaText2:{
        fontFamily: 'AbadiMTCondensedExtraBold',
        fontSize: ThemeUtility.h(65),
        lineHeight: ThemeUtility.h(65),
        color: '#fff',
        textAlign:'center',
    },
});

