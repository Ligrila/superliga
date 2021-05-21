

import { StyleSheet } from 'react-native';
import Layout from '../../constants/Layout';
import { Variables } from '../../styles';

export default  StyleSheet.create( {
    container:{
        backgroundColor: Variables.championshipItemBg,
        marginTop: 0,
        paddingVertical: Layout.h(40),
        paddingHorizontal: Layout.s(120),
        flexDirection: 'row'
    },
    containerVariant:{
        backgroundColor: Variables.championshipItemVariantBg, 
    },
  
    dateText:{
        marginTop: Layout.h(20),
        textAlign: 'left',
        fontFamily: 'OpenSansCondensed_light',
        color: '#fff'
    },
    body:{
        flexDirection: 'column',
        width: '100%'
    },
    text: {
        fontSize: Layout.s(36),
        fontFamily: 'OpenSansCondensed_bold',
        color: '#fff'
    }
});
