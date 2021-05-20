

import { StyleSheet } from 'react-native';
import Layout from '../../constants/Layout';
import { Variables } from '../../styles';

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: Layout.s(412),
    },
    gradient:{
        width: '100%',
        paddingTop: 15,
        height: Layout.s(412),
         
    },
    messageContainer:{
        flex:1,
        
        paddingHorizontal:Layout.s(20),
         marginBottom: Layout.s(50)
    },
    formTrigger:{
        position: 'absolute',
        right: 0,
        top: -8,
        flexDirection: 'row',
    },
    formMessageTriggerIcon:{
        color: '#fff'
    },
    formItem:{ 
        backgroundColor: Variables.white,
        paddingHorizontal: 15
    },
    formItemInput:{ 
        color: Variables.dark,
        
    }
});

export default styles; 
