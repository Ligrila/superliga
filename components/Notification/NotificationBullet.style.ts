import { StyleSheet } from 'react-native';
import Layout from '../../constants/Layout';

export default  StyleSheet.create( {
    container:{
        width: Layout.s(30),
        height: Layout.s(30),
        borderRadius: Layout.s(30),
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'

    },
    text:{
        color: '#fff',
        textAlign:'center',
        fontSize: Layout.s(23)
    }
});
