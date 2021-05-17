
import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility'

export default StyleSheet.create({
    statistics: {
        flex: 1,
    },
    ranking: {
        textAlign: 'center',
        fontSize: ThemeUtility.h(212),
        fontFamily: 'OpenSansCondensed_bold',
        color: '#e4c7fb'
    },

    title: {
        textAlign: 'center',
        fontSize: ThemeUtility.h(50),
        fontFamily: 'OpenSansCondensed_bold',
    },
    titleSeparatorContainer: {
        alignItems: 'center'
    },
    titleSeparator: {
        height: 1,
        width: ThemeUtility.s(100),
        backgroundColor: '#fff',
    },
    subtitle: {
        textAlign: 'center',
        fontSize: ThemeUtility.h(30),
        fontFamily: 'OpenSansCondensed_bold',
        marginBottom: ThemeUtility.h(10),
    },
    container: {
        flex: 1,

    },
    statisticsContainer: {
        marginTop: ThemeUtility.h(15),
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginBottom: 15
    },
    statisticsItem: {
    },
});

