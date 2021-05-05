

import { StyleSheet } from 'react-native';
import Layout from '../../constants/Layout';
import { Variables } from '../../styles';
import ThemeUtility from '../../utilities/Theme/Theme.utility';

export default StyleSheet.create({
    

    bigTitle: {
        position: 'relative',
        zIndex: 100,
        marginBottom: ThemeUtility.h(-120)
    },
    
    profileWallpaper: {
        flex: 1,
        position: 'relative',
    },
    content:{
        flex:1,
        alignItems:'center',
        justifyContent: 'flex-start'
    },
    container:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
        width: '80%'
    },
    form:{
        width:'100%',                    
    },
    
    itemContainer: {
        width: '100%',
        marginTop: Layout.h(20),    
        marginBottom: 5,
        marginLeft: 15,
    },
    item:{
        width: '100%',
        paddingLeft: 10,
        marginLeft: 0    
    }, 
    pickerText:{
        color: '#fff',
        fontFamily: 'OpenSansCondensed_light',
        fontSize: Layout.s(40)
    },
    pickerItemText:{
        color: '#282828'
    },
    placeholder:{
        fontFamily: 'OpenSansCondensed_light',
        fontSize: Layout.s(40),
        color:'#fff',
    },
    input:{
        fontSize: Layout.s(40),
        width:'90%',
        
        alignItems:'flex-start',
        fontFamily: 'OpenSansCondensed_light',
    },
    submitButton:{
        marginTop: Layout.h(40),
    },
    backButton:{
        marginTop: Layout.h(40),
    },
    backButtonText:{
        color: Variables.dark,
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(35)
    },
    submitButtonText:{
        color: '#fff',
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: Layout.s(35)
    },
    
});