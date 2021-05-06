import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility';

export default StyleSheet.create({

    bigTitle: {
        position: 'relative',
        zIndex: 100,
        marginBottom: ThemeUtility.h(-120)
    },
    profileContent:{
        paddingTop: 20,
        // overflow: 'hidden'
    },
    profileContainer: {
        paddingTop: ThemeUtility.h(120),
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column', 
    },
    userTitleContainer:{
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        marginVertical: ThemeUtility.h(70),
    },
    userTitle: { 
        fontSize: ThemeUtility.s(48),
        fontFamily: 'OpenSansCondensed_light',
    },
    icon: {
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center'

    },

    profile: {
        flex: 1,
        marginTop: ThemeUtility.h(10),
        backgroundColor: 'red',
        paddingVertical: 0
    },
    profileWallpaper: {
        flex: 1,
        position: 'relative',
    },
    bold: {
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(40)
    },
    text: {
        fontFamily: 'OpenSansCondensed_light',
        fontSize: ThemeUtility.s(40),
    },
    textInformation: {
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: ThemeUtility.h(70),
    },
    textInformationLine:{
        flexDirection: 'row',
    },
    changeAvatarButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30
    },
    changeAvatarButtonText: {
        fontFamily: 'OpenSansCondensed_light',
        fontSize: ThemeUtility.s(40),
        color: '#fff'
    },
    buttonsContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    }
});