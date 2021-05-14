import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility';

export default StyleSheet.create({
    container:{
        flex:1,
        justifyContent:  'center',
        alignItems: 'center',     
        marginTop: -70
    },
    background: {
        width: ThemeUtility.s(575),
        height: ThemeUtility.s(939),
        maxHeight: ThemeUtility.h(939),
        position: 'relative',
    },
    close:{
        position:'absolute',
        top: 10,
        right: 10,
        zIndex:22,
    },
    closeTouchable:{
    },
    closeText:{
        fontFamily: 'Roboto',
        fontSize: ThemeUtility.s(44),
    },
    header:{
        height: ThemeUtility.s(939) / 2,
        justifyContent:  'center',
        alignItems: 'center',     

    },
    headerText:{
        fontFamily: 'OpenSansCondensed_light',
        color: '#fff',
        fontSize: ThemeUtility.s(80),
        textAlign: 'center',
  
    },
    item:{
        height: (ThemeUtility.s(939) / 2) / 3,
        justifyContent:  'center',
        alignItems: 'center',            
    },
    itemText:{
        color: '#282828',
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.h(40),
        textAlign: 'center',
    }
});

