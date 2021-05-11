import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility';
import Variables from '../../styles/Variables';

export default StyleSheet.create({
    content: {
        flex: 1,
    },
    nextTriviaIconsContainer: {
        // height: (Layout.window.height / 2) - (Layout.isIphoneX ? ThemeUtility.h(85) : Layout.isIphoneXR ? ThemeUtility.h(75) : ThemeUtility.h(60)),
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 15,
        marginBottom: 40,
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
        
    },
    nextMatchContainer:{
        position: 'absolute',
        bottom: 0,
        flexDirection: 'column'
    },
    nextMatchButton:{
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'column'
    },
    nextMatchText:{
        textAlign: 'center',
        fontFamily: Variables.openSansCondensedBold,
        fontSize: ThemeUtility.s(40),
        marginBottom: 8
        
    }
});