import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility';

export default StyleSheet.create({
    container:{
        justifyContent: 'center'
    },
    ballContainer:{
        alignItems: 'center'
    },
    ballImg:{
        width: ThemeUtility.s(140),
        height: ThemeUtility.s(140),

    },
});

