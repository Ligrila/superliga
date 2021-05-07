import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility';
import Variables from '../../styles/Variables';


export default StyleSheet.create({

    pickerHeader: {
        backgroundColor: Variables.brandPrimary
    },
    pickerHeaderTitle: {
        color: '#fff'
    },
    pickerBackIcon: {
        fontSize: ThemeUtility.s(50),
        color: '#fff'
    },
    pickerItem: {
        width: ThemeUtility.s(547),
        backgroundColor: '#fff',
        marginBottom: ThemeUtility.h(0),
        marginTop: ThemeUtility.h(0),
        height: 40,
        flexDirection: 'row',
        borderRadius: 4,
        
    },
    picker: {
        borderRadius: 4,
        flex: 1,
        // width: ThemeUtility.s(547),
        width: ThemeUtility.s(547),
        paddingHorizontal: 20,
        height: 40,
        color: '#353535',
        fontFamily: 'OpenSansCondensed_bold',
        
    },
    pickerIcon: {
        color: '#353535',
        position: 'absolute',
        top: 5,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: ThemeUtility.s(20),
        marginLeft: 'auto'

    },
    pickerText: {
        color: '#353535',
        fontFamily: 'OpenSansCondensed_bold',
        textAlign: 'center',
        fontSize: ThemeUtility.s(31),
        marginLeft: 0,
        paddingLeft: 0,
        opacity: 1,
    },
    pickerItemText: {
        color: '#353535',
    }
});
