import { StyleSheet } from 'react-native';
import Layout from '../../constants/Layout';
import { Variables } from '../../styles';


export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: Layout.window.width,
        flex: 1,
        marginTop: Layout.s(2)
    },
    position: {
        backgroundColor: '#fff',
        flex: .2,
        padding: Layout.s(10),
        alignItems: 'center',
        justifyContent: 'center',

    },
    nameContainer: {
        backgroundColor: Variables.championshipItemVariantBg,
        flexDirection: 'row',
        padding: Layout.s(10),
        paddingLeft: Layout.s(100),
        flex: .8,
        alignItems: 'center',
        justifyContent: 'flex-start',

    },
    nameContainerAltRow: {
        backgroundColor: Variables.championshipItemBg,
    },

    positionText: {
        fontFamily: 'OpenSansCondensed_light',
        fontSize: Layout.s(30),
        color: '#282828',
    },
    nameText: {
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: Layout.s(37),
        lineHeight: Layout.s(37),
        color: '#fff',
    },
    pointsText: {
        fontFamily: 'OpenSansCondensed_light',
        fontSize: Layout.s(41),
        color: '#fff'
    },

    name: {
        flex: .6,
    },
    points: {
        flex: .2
    },
    challenge: {
        flex: .2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        position: 'absolute',
        left: Layout.s(110),
        top: Layout.s(20)
    },
    flagButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    flagIcon: {
        color: '#fff'
    },
    flag: {
        width: Layout.s(40),
        height: Layout.s(38)
    },

});