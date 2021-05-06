import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility';

export default StyleSheet.create({

    statistics: {
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginBottom: 20
    },
    statisticsItem: {
    },
    shareContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    shareImg: {
        width: ThemeUtility.s(159),
        height: ThemeUtility.s(149)
    },

});