import { StyleSheet } from 'react-native';
import ThemeUtility from '../../Theme/utilities/ThemeUtility';
import { FooterStyle } from '../../Theme/AppTheme';
import Layout from '../../constants/Layout';

export default StyleSheet.create({
    content: {
        flex: 1,
    },
    nextMatchLink: {
        alignItems: 'center',
    },
    nextTriviaIconsContainer: {
        position: 'relative',
        height: (Layout.window.height / 2) - (Layout.isIphoneX ? ThemeUtility.h(85) : Layout.isIphoneXR ? ThemeUtility.h(75) : ThemeUtility.h(60)),
    },
    nextMatchText: {
        textAlign: 'center',
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(40),
    },

    nextMatchImage: {
        marginTop: ThemeUtility.h(27),
        marginBottom: ThemeUtility.h(27),
        width: ThemeUtility.s(32),
        height: ThemeUtility.s(40),
    },
    userStatisticsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: ThemeUtility.h(80)
    },
    userStatisticsItem: {

    },
    userStatisticsSeparator: {
        height: ThemeUtility.h(40),
        width: 2,
        backgroundColor: '#fff',
        marginHorizontal: ThemeUtility.s(30),
    },
    userStatisticsItemValue: {
        fontFamily: 'OpenSansCondensed_light',
        fontSize: ThemeUtility.h(80),
        textAlign: 'center'


    },
    userStatisticsItemText: {
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.h(30),
        textAlign: 'center'
    },
    actionsContainer: {
        marginTop: ThemeUtility.h(50),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    actionsItem: {
        paddingHorizontal: ThemeUtility.s(40),
        alignItems: 'center',
        flexDirection: 'row',

    },
    actionsItemText: {
        color: '#7e599a',
        fontSize: ThemeUtility.h(73),
    },
    actionsIcon: {
        width: ThemeUtility.s(118),
        height: ThemeUtility.s(118)
    },
    footer: {
        ...FooterStyle,
        height: 'auto'
    }
});