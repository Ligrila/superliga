import { StyleSheet } from 'react-native';
import { Variables } from '../../styles';
import ThemeUtility from '../../utilities/Theme/Theme.utility';

export default StyleSheet.create({
    
    content:{
        marginTop:  ThemeUtility.h(50),
        alignItems:'center',
        justifyContent:'center'
    },
    bg:{
        width: ThemeUtility.s(575),
        height: ThemeUtility.s(828)
    },
    close:{
        position:'absolute',
        top: 10,
        right: 10,
        zIndex:22,
    },
    closeTouchable:{
    },
    closeText:{
        fontFamily: 'Roboto',
        fontSize: ThemeUtility.s(44),
    },

    messageContainer:{
        paddingTop: ThemeUtility.s(100),
        paddingHorizontal: ThemeUtility.s(40),
        alignItems:'center',
        justifyContent:'center'
    },
    title:{
        fontFamily: 'edosz',
        fontSize: ThemeUtility.s(127),
        marginBottom: ThemeUtility.s(50),
    },
    buttonContainer:{
        marginTop: ThemeUtility.s(70),
        flexDirection: 'row'
    },
    lastButton:{
        marginLeft:ThemeUtility.s(20)
    },
    buttonText:{
        color: '#fff',
        fontFamily: Variables.openSansCondensedBold,
        fontSize: ThemeUtility.s(35)
    },
    text:{
        fontFamily:  Variables.openSansCondensedLight,
        fontSize:ThemeUtility.s(40),
        textAlign: 'center'
    },
    textBold:{
        fontFamily:  Variables.openSansCondensedBold,
        fontSize:ThemeUtility.s(40),
        textAlign: 'center'
    },
});