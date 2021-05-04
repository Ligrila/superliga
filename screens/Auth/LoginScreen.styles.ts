import { StyleSheet } from 'react-native';
import ThemeUtility from '../../Theme/utilities/ThemeUtility';


export default StyleSheet.create({

    login: {
        flex: 1,
        minHeight: '100%',
        alignItems: 'center', // horizontal
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center'

    },
    title: {
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(40)
    },
    item: {
        width: '100%',
    },
    input: {
        fontSize: ThemeUtility.s(40),
        width: '100%',
        fontFamily: 'OpenSansCondensed_light',
    },
    submitButton: {
        backgroundColor: '#7b4294',
        marginTop: ThemeUtility.h(40),
    },
    submitButtonText: {
        color: '#fff',
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(35)
    },
    registerTitle: {
        fontFamily: 'OpenSansCondensed_light',
        fontSize: ThemeUtility.s(40),
        marginTop: ThemeUtility.h(50),
    },
    registerSubTitle: {
        fontFamily: 'OpenSansCondensed_light',
        fontSize: ThemeUtility.s(35),
        textAlign: 'center',
        marginTop: ThemeUtility.h(10),
    },
    registerButton: {
        marginTop: ThemeUtility.s(30),
    },
    registerButtonText: {
        color: '#282828',
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(35)
    },
    socialButton: {
        width: ThemeUtility.s(80),
        height: ThemeUtility.s(80),
        paddingHorizontal: 0,
        borderWidth: 0,
        borderRadius: ThemeUtility.s(80),
        justifyContent: 'center',
        marginHorizontal: 0,
    },
    socialButtonIcon: {
        fontSize: ThemeUtility.s(40),
        marginHorizontal: 0,
        paddingHorizontal: 0,
    },
    socialLoginContainer: {
        marginTop: ThemeUtility.h(50),
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    socialLoginTitle: {
        fontFamily: 'OpenSansCondensed_light',
        fontSize: ThemeUtility.s(40),
    },
    socialLoginIcons: {
        marginTop: ThemeUtility.h(30),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    socialIconSeparator: {
        width: 1,
        height: ThemeUtility.h(20),
        backgroundColor: '#fff',
        marginHorizontal: 10,
    },
    termsAndConditionsContainer: {
        marginTop: ThemeUtility.h(20),

    }
});