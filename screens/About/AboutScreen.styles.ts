

import { StyleSheet } from 'react-native';
import Layout from '../../constants/Layout';
import { Variables } from '../../styles';


export default StyleSheet.create({
    content:{
        flex:1,
        alignItems: 'center',
    },
    icon:{
        width: Layout.s(320),
        height: Layout.s(320),
        marginBottom: 20
        
    },
    text:{
        fontFamily: Variables.openSansCondensedBold,
        fontSize: Layout.s(35),
        marginBottom: 8
    },

    buttonText: {
        color: Variables.white,
        fontFamily: Variables.openSansCondensedBold,
        fontSize: Layout.s(35)
    }
});