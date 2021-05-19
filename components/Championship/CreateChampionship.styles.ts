import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility'


export default StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',

    },
    form:{
        marginTop: 20
    },
    item:{
         
    },
    placeholder:{
        fontSize: ThemeUtility.s(35),
        fontFamily: 'OpenSansCondensed_bold',
        color: 'rgba(255,255,255,0.6)',
    },
    label:{
        fontSize: ThemeUtility.s(35),
        fontFamily: 'OpenSansCondensed_bold',
        color: '#fff',
        width: '100%',
        textAlign: 'center',
    },
    input:{
        borderRadius: ThemeUtility.s(10),
        textAlign: 'center',
        fontSize: ThemeUtility.s(35),
        fontFamily: 'OpenSansCondensed_bold',
        color: '#fff',
        borderWidth: 0,
        height: ThemeUtility.h(120),
        alignItems: 'center',
        justifyContent: 'center',
    },
    calendarContainer:{
        marginTop: ThemeUtility.h(30),
        borderRadius: ThemeUtility.s(10),
        textAlign: 'center',
        fontSize: ThemeUtility.s(35),
        fontFamily: 'OpenSansCondensed_bold',
        color: '#282828',
        backgroundColor: '#fff', 
        borderWidth: 0,
        height: ThemeUtility.h(120),
        alignItems: 'center',
        justifyContent: 'center',
    },
    calendarIcon:{
        color: '#7b4294',
        fontSize: ThemeUtility.s(45),
    },
    calendar:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    buttonContainer:{
        marginTop: ThemeUtility.h(30),
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    button:{
        width: ThemeUtility.s(126),
        height: ThemeUtility.s(126),
        borderRadius: ThemeUtility.s(126),
        alignItems: 'center',
        justifyContent: 'center'

    },
    buttonIcon:{
        color: '#fff', 

    },
});