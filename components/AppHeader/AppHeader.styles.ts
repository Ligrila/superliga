

import { StyleSheet } from 'react-native';
import Layout from '../../constants/Layout';

export default StyleSheet.create({
    header: {
        paddingTop: Layout.isIphoneX ? 5 : Layout.isIphoneXR ? 35 : Layout.isAndroid ? 23 : 0,
        paddingBottom: Layout.isAndroid ? 20 : 0,
        justifyContent: 'flex-start',
        height: 'auto',
        alignContent: 'flex-start'

    },
    
    left: {
        flex: 1,
        paddingTop: Layout.isIphoneX ? 40 : Layout.isPhoneXR ? 60 : 10,
        height: '100%',
        alignItems: 'flex-start'
    },
    body: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
    },
    right: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        alignItems: 'flex-start'
    },
    title: {

    },
    superligaAppImg: {
        width: Layout.s(158),
        height: Layout.s(147),
        marginLeft: Layout.platform == 'ios' ? 2 : 0, // por alguna razon en IOS no se centra la imagen
    },
    menuImg: {
        width: Layout.s(61),
        height: Layout.s(26),
    },
    superligaImg: {
        width: Layout.s(65),
        height: Layout.s(65),
    },
    notificationBullet: {
        position: 'absolute',
        top: Layout.s(36),
        right: Layout.s(60),
    }
});