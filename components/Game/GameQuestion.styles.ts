import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility'

export default StyleSheet.create({
    container: {
      marginTop: 15.
    },
    text: {
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.h(45),
        textAlign: 'center'
    },
    subtitleContainer:{
        marginVertical: 8,
    },
    subtitle: {
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.h(30),
        textAlign: 'center'
    },
    button: {
        marginTop: ThemeUtility.h(30),
        height: ThemeUtility.h(105),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    buttonText: {
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.h(35),
        textAlign: 'center',
    },
    correctQuestionIcon: {
        color: '#00a651',
        fontSize: ThemeUtility.h(35),
        position: 'absolute',
        top: ThemeUtility.h(37),
        right: ThemeUtility.s(20),
    }
});

