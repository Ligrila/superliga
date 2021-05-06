import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility';
import Layout from '../../constants/Layout';

const avatarSize = Layout.window.height / 5;
export default StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    slide:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: 'white',
        paddingTop: avatarSize * 0.7 ,
        marginTop: avatarSize * 0.3 ,
        marginBottom: 30,
        paddingBottom: 30
    },
    carousel:{
        
    },
    absoluteBg:{
        top: 50,
        bottom: 30,
        left:0,
        right:0,
        position:'absolute',
        backgroundColor: 'white',

    },
    avatarContainer:{
        width: avatarSize,
        height: avatarSize,
        position: 'absolute',
        top: avatarSize * 0.3  * -1
    },
    avatar:{
        width: avatarSize,
        height: avatarSize,
        resizeMode: 'contain'
    },
    title:{
        color: '#282828',
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(40),
        width: ThemeUtility.s(540),
        textAlign: 'center',
    },
    description:{
        color: '#282828',
        fontFamily: 'OpenSansCondensed_light',
        fontSize: ThemeUtility.s(35),
        width: ThemeUtility.s(540),
        textAlign: 'center',
    },
    points:{
        marginTop: ThemeUtility.h(15),
        marginBottom: ThemeUtility.h(15),
        // marginBottom: ThemeUtility.h(32),
        color: '#7b4295',
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(35),
        textAlign: 'center',
    },
    buttonContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: -30
    },

    button:{
        alignItems: 'center',
        justifyContent: 'center',
        width: ThemeUtility.s(540)
    },


    buttonText:{
        color: '#fff',
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(35)
    },
});