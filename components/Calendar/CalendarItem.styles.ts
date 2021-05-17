import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility'
import Variables from '../../styles/Variables';

const styles = StyleSheet.create({
    title: {
        color: '#99e0ff',
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(40),
        textAlign: 'center',
        marginTop: ThemeUtility.h(35),
    },
    allTrivias: {
        marginTop: ThemeUtility.h(40),
        paddingHorizontal: ThemeUtility.h(10)
    },
    triviaContainer: {
        flex: 1,
        flexDirection: 'row',
        borderTopColor: '#ffffff',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        paddingVertical: ThemeUtility.h(35),
        borderBottomColor: 'transparent'
    },
    avatarContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    vsText: {
        marginLeft: 8,
        marginRight: 8,
        fontFamily: Variables.openSansCondensedBold,
        fontSize: ThemeUtility.s(40)
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10
    },
    teamsText: {
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(40),
        color: '#fff',
        marginBottom: 5
    },
    dateText: {
        fontFamily: 'OpenSansCondensed_light',
        color: '#fff',
        fontSize: ThemeUtility.s(40),
    }
});

export default styles; 
