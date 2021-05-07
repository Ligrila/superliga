import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility';
// import Variables from '../../styles/Variables';


export default StyleSheet.create({
    pickerContainer:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
        marginTop: 25
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10
    },
    bold:{
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(50),
        textAlign: 'center'
    },
    light:{
        fontFamily: 'OpenSansCondensed_light',
        fontSize: ThemeUtility.s(50),
        textAlign: 'center',
        marginBottom: ThemeUtility.h(50)

    },
    rankingEmpty:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'column',
        paddingVertical: 30,
        borderBottomColor: '#fff',
        borderBottomWidth: 1
    },
    rankingEmptyText:{
        fontFamily: 'OpenSansCondensed_bold',
        color: '#fff',
        fontSize: 30

    }
});