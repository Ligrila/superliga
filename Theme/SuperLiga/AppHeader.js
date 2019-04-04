import Layout from '../../constants/Layout';

export default {
    header: {
        paddingTop: Layout.isIphoneX ? 5 : Layout.isIphoneXR ? 35 : Layout.isAndroid ? 23 : 0,
        paddingBottom: Layout.isAndroid ? 20 : 0,
        zIndex: 1,
        justifyContent: 'flex-start',
        height: 'auto',
    },
    left:{
      flex:1,
      paddingTop: Layout.isIphoneX ? 40 : Layout.isPhoneXR ? 60: 10,
    },
    body:{
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
    },
    right:{
        position: 'relative',
        flex:1,
    },
    title:{
        
    },
    superligaAppImg: {
        width: Layout.s(158),
        height: Layout.s(147),
        marginLeft: Layout.platform == 'ios' ? 2 : 0, // por alguna razon en IOS no se centra la imagen
     },
    menuImg:{
        width: Layout.s(61),
        height: Layout.s(26),
    },
    superligaImg: {
        width: Layout.s(65),
        height: Layout.s(65),
    },
    notificationBullet:{
        position: 'absolute',
        top: Layout.s(36),
        right: Layout.s(60),
    }
  }