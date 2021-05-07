import { StyleSheet } from 'react-native';
import Variables from '../../styles/Variables';
import ThemeUtility from '../../utilities/Theme/Theme.utility';


export default StyleSheet.create({

    login: {
        // flex: 1,
        minHeight: '100%',
        alignItems: 'center', // horizontal
        justifyContent: 'center',
    },
    register: {
        
        minHeight: 'auto',
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
        fontSize: ThemeUtility.s(40),
        marginBottom: 20
    },
    form: {
        marginBottom: 41,
    },
    itemContainer: {
        width: '100%',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 15,
        marginRight: 15,
    },
    item: {
        width: '100%',
        paddingLeft: 10,
        marginLeft: 0
    },    
    itemMargin: {
        marginBottom: 15,
        
    },
    input: {
        fontSize: ThemeUtility.s(40),
        width: '100%',
        fontFamily: 'OpenSansCondensed_light',
    },
    submitButton: {
        backgroundColor: Variables.brandPrimary,
        marginTop: ThemeUtility.h(40),
    },
    submitButtonText: {
        color: '#fff',
        fontFamily: Variables.openSansCondensedBold,
        fontSize: ThemeUtility.s(35)
    },
    registerTitle: {
        fontFamily: 'OpenSansCondensed_light',
        fontSize: ThemeUtility.s(40),
        marginTop: 20,
        marginBottom: 20,
    },
    registerSubTitle: {
        fontFamily: 'OpenSansCondensed_light',
        fontSize: ThemeUtility.s(35),
        textAlign: 'center',
        marginTop: ThemeUtility.h(10),
    },
    registerButton: {
        backgroundColor: Variables.brandInfo,
        marginBottom: 20,
    },
    registerButtonText: {
        color: Variables.dark,
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(35)
    },
    socialButton: {
        width: ThemeUtility.s(80),
        height: ThemeUtility.s(80),
        borderRadius: ThemeUtility.s(80),
        paddingHorizontal: 0,
        borderWidth: 0,
        marginHorizontal: 0,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
    },
    socialButtonIcon: {
        fontSize: ThemeUtility.s(40),
        marginHorizontal: 0,
        paddingHorizontal: 0,
        color: Variables.darkBlue,
        textAlign: 'center',
        marginRight: 0,
        marginLeft: 0
    },
    socialLoginContainer: {
        marginTop: ThemeUtility.h(50),
        width: "auto",
        justifyContent: 'center',
        alignItems: 'center',
    },
    socialLoginTitle: {
        fontFamily: 'OpenSansCondensed_light',
        fontSize: ThemeUtility.s(40),
        marginBottom: 15
    },
    socialLoginIcons: {
        marginTop: ThemeUtility.h(30),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    socialIconSeparator: {
        width: 1,
        height: ThemeUtility.s(26),
        backgroundColor: '#fff',
        marginHorizontal: 10,
    },
    termsAndConditionsContainer: {
        marginTop: ThemeUtility.h(20),

    }
});