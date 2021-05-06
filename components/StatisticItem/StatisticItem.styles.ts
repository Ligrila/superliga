import { StyleSheet } from 'react-native';
import Layout from '../../constants/Layout'
import ThemeUtility from '../../utilities/Theme/Theme.utility';

export default StyleSheet.create({

    container:{
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
    },
    fill:{
        flex:1,
        backgroundColor: '#fff',
        width:150 * Layout.window.ratio,
        height: 150 * Layout.window.ratio,
        borderRadius: 150 * Layout.window.ratio,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
    },
    fillText:{
        color: '#000',
        fontFamily: 'OpenSans_bold',
        fontSize: ThemeUtility.s(40),
        textAlign:'center',
    },
    text:{
        //fontFamily: 'OpenSans',
        fontSize: ThemeUtility.s(20),
        marginTop: ThemeUtility.s(10),
        textAlign:'center',
    }
});