import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility';

export default StyleSheet.create({

    statistics: {
        paddingVertical: 0
    },
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40
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