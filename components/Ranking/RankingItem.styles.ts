import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility';
import Variables from '../../styles/Variables';

export default StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        // flex:1,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:2,
    },
    number:{
        flex:1,
        backgroundColor: '#fff',
        height: 80,
        alignItems:'center',
        justifyContent:'center',
    },
    numberText:{
        color: '#282828',
        fontFamily: Variables.openSansCondensedLight,
        fontSize: 25
    },
    name:{
        display:'flex',
        flexDirection: 'row',
        flex:4,
        backgroundColor: '#245591',
        height: 80,
        alignItems:'center',
        paddingHorizontal: ThemeUtility.s(60),
        justifyContent: 'space-between',
    },
    nameText:{
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(30)
    },
    namePointsText:{
        fontFamily: 'OpenSansCondensed_light',
        fontSize: ThemeUtility.s(48)
    }
});