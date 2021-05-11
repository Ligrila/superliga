import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility'

const styles = StyleSheet.create({
    content: {
    },
    vsText: {
        marginLeft: 8,
        marginRight: 8,
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(40),
    },
    triviaContainer:{
        paddingVertical: ThemeUtility.s(40),
    }

});

export default styles;
