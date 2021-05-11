import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility';

export default StyleSheet.create({
    avatarContainer:{
        //flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    vsText:{
        marginLeft: 8,
        marginRight: 8,
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(50),
    },

});

